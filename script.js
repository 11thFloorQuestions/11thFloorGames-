// ==========================================
// 11th Floor Questions — Core Game Engine
// v0.5 changes (marked "v0.5"), same as TYKB:
//  - Option buttons rebuilt fresh each floor (no colour carry-over)
//  - First wrong answer of the session recorded (a timeout never counts)
//  - Every fall logged in stats (floor + wrong/timeout)
//  - Flash after an answer is 0.4s (was 0.8s)
//  - Receipt: "on Nth attempt", date, Accuracy (x/10)
//  - "?" rules pop-up, landing screen only
//  - Debug switch: questions.html?debug=win&attempt=3&fail=4&time=92
// v0.6: dated queue + manifest (questions-manifest.json), game day changes at 03:00 London time,
//  - Replay list reads the manifest instead of guessing file names (old way kept as a fallback)
// ==========================================

// ==========================================
// 1. HELPER FUNCTIONS & UTILITIES
// ==========================================

function safeAddListener(id, event, handler) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener(event, (e) => {
            triggerHaptic(15);
            handler(e);
        });
    }
}

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
    }
}

function safeToggleClass(id, className, force) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle(className, force);
    }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// v0.5: general ordinal helper (1st, 2nd, 3rd, 4th ... 11th, 21st)
function ordinal(n) {
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
    const mod10 = n % 10;
    if (mod10 === 1) return `${n}st`;
    if (mod10 === 2) return `${n}nd`;
    if (mod10 === 3) return `${n}rd`;
    return `${n}th`;
}

function getOrdinalFloorHTML(floorNum) {
    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
    const ord = ordinals[floorNum - 1] || `${floorNum}th`;
    return `<span style="color: var(--genre-gold, #facc15); font-weight: 800;">${ord}</span>`;
}

// v0.5: same date format as TYKB, e.g. "Mon 19th Oct 2026"
function getFormattedDateString() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    return `${days[now.getDay()]} ${ordinal(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
}


// ==========================================
// HAPTIC FEEDBACK ENGINE
// ==========================================

function triggerHaptic(pattern) {
    if ('vibrate' in navigator) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {}
    }
}


// ==========================================
// 2. STATE MANAGEMENT & STATS PERSISTENCE
// ==========================================

const gameState = {
    currentFloor: 1,
    maxFloors: 10,
    soundEnabled: true,
    timer: null,
    timeLeft: 15,
    questions: [],
    currentQuestionIndex: 0,
    batchIndex: 0,
    startTime: 0,
    timerInterval: null,
    timeElapsedSeconds: 0,
    attemptsToday: 1,
    // v0.5: floor of the first WRONG ANSWER this session (any attempt).
    // A timeout never sets this. null = no wrong answer = green 10/10.
    firstWrongFloor: null,
    stats: {
        played: 0,
        wins: 0,
        streak: 0,
        bestFloor: 1,
        bestTimeSeconds: null,
        // v0.5: quiet record for the stats window.
        // fallsByFloor: { "4": { wrong: 2, timeout: 1 }, ... }
        fallsByFloor: {},
        totalFalls: 0
    }
};

let debugMode = false;

const floorMessageBatches = [
    // Batch 1: Classic Climb
    [
        "Tough questions ahead — no mistakes!",
        "Get this wrong and down to Ground Floor you go!",
        "3rd Floor reached — stay sharp!",
        "One mistake resets you to Ground Floor.",
        "Halfway up! Stay focused.",
        "6th Floor unlocked — pure precision!",
        "Ground Floor is far below now.",
        "Almost there!",
        "Keep going!",
        "Final hurdle — make it count!"
    ],
    // Batch 2: High Energy
    [
        "Watch your step — no mistakes!",
        "Miss one and back to Ground Floor!",
        "Moving up nicely — keep going!",
        "One slip resets the climb.",
        "Halfway mark — stay locked in!",
        "Great streak — hold your focus!",
        "Ground Floor is way behind you.",
        "You're so close!",
        "Almost at the top!",
        "One right answer left!"
    ],
    // Batch 3: Focused & Direct
    [
        "The climb begins — take your time.",
        "Wrong answer sends you back down!",
        "3rd Floor reached — smooth sailing.",
        "Stay cool under pressure.",
        "Halfway to victory!",
        "Step by step — pure focus.",
        "High altitude — keep it clean!",
        "Almost there!",
        "Push through!",
        "Final question — finish it!"
    ]
];

function loadSavedStats() {
    try {
        const saved = localStorage.getItem('11fl_stats');
        if (saved) {
            gameState.stats = { ...gameState.stats, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn('Could not load stats from localStorage.');
    }
}

function saveStats() {
    if (debugMode) return; // v0.5: debug never touches real stats
    try {
        localStorage.setItem('11fl_stats', JSON.stringify(gameState.stats));
    } catch (e) {
        console.warn('Could not save stats to localStorage.');
    }
}

// v0.5: log one fall. type is 'wrong' or 'timeout'.
function recordFall(floor, type) {
    const key = String(floor);
    if (!gameState.stats.fallsByFloor || typeof gameState.stats.fallsByFloor !== 'object') {
        gameState.stats.fallsByFloor = {};
    }
    if (!gameState.stats.fallsByFloor[key]) {
        gameState.stats.fallsByFloor[key] = { wrong: 0, timeout: 0 };
    }
    gameState.stats.fallsByFloor[key][type === 'timeout' ? 'timeout' : 'wrong']++;
    gameState.stats.totalFalls = (gameState.stats.totalFalls || 0) + 1;
}

loadSavedStats();


// ==========================================
// GAMEPLAY SESSION STOPWATCH TIMER
// ==========================================

function startSessionTimer() {
    stopSessionTimer();
    gameState.timeElapsedSeconds = 0;
    gameState.startTime = Date.now();
    const activeGameTimer = document.getElementById("active-game-timer");
    if (activeGameTimer) {
        activeGameTimer.style.display = "block";
        activeGameTimer.textContent = "00:00";
    }
    gameState.timerInterval = setInterval(updateSessionTimerDisplay, 1000);
}

function stopSessionTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

function updateSessionTimerDisplay() {
    gameState.timeElapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
    const activeGameTimer = document.getElementById("active-game-timer");
    if (activeGameTimer) {
        activeGameTimer.textContent = formatTime(gameState.timeElapsedSeconds);
    }
}

function formatTime(totalSeconds) {
    if (totalSeconds === null || totalSeconds === undefined) return "--:--";
    const m = Math.floor(totalSeconds / 60);
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}


// ==========================================
// AUDIO ENGINE (EXACT SOUND FILE PLAYBACK)
// ==========================================

const elevatorDingAudio = new Audio();
elevatorDingAudio.src = 'ding.mp3';

function playElevatorDing() {
    if (!gameState.soundEnabled) return;
    try {
        elevatorDingAudio.currentTime = 0;
        elevatorDingAudio.play().catch(e => {
            elevatorDingAudio.src = 'assets/audio/ding.mp3';
            elevatorDingAudio.play().catch(() => {});
        });
    } catch (e) {
        console.warn('Audio playback error:', e);
    }
}

function triggerLandingPageDing() {
    setTimeout(() => {
        playElevatorDing();
    }, 1370);
}


// ==========================================
// 3. NAVIGATION & SCREEN SWITCHING
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    safeAddListener('btn-start-climb', 'click', () => {
        startDailyClimb();
    });

    safeAddListener('btn-landing-stats', 'click', () => openVault());
    
    safeAddListener('btn-victory-stats', 'click', () => {
        openVault();
    });

    safeAddListener('btn-back-vault', 'click', () => {
        closeModal('modal-game-over');
        openVault();
    });

    safeAddListener('btn-close-vault', 'click', () => {
        closeModal('modal-vault');
        const victoryScreen = document.getElementById('victory-screen');
        if (victoryScreen && victoryScreen.style.display !== 'none') {
            resetToLandingScreen();
        }
    });

    safeAddListener('btn-try-again', 'click', () => {
        closeModal('modal-game-over');
        gameState.attemptsToday++;
        if (gameState.questions && gameState.questions.length > 0) {
            startGame();
        } else {
            startDailyClimb();
        }
    });

    safeAddListener('btn-sound-toggle', 'click', toggleSound);

    // v0.5: rules pop-up (the ? button only shows on the landing screen, so it can never cost a player time mid-climb)
    safeAddListener('btn-rules', 'click', () => openModal('modal-rules'));
    safeAddListener('btn-close-rules', 'click', () => closeModal('modal-rules'));

    updateSoundUI();

    runDebugSwitch();
});

// v0.5: jump straight to the victory screen for testing.
// Example: questions.html?debug=win&attempt=3&fail=4&time=92
// attempt = which attempt it was, fail = floor of first wrong answer (omit for clean run),
// time = seconds. Nothing is saved to real stats. REMOVE OR LOCK BEFORE LAUNCH.
function runDebugSwitch() {
    let params;
    try {
        params = new URLSearchParams(window.location.search);
    } catch (e) {
        return;
    }
    if (params.get('debug') !== 'win') return;

    debugMode = true;
    const attempt = parseInt(params.get('attempt'), 10);
    const fail = parseInt(params.get('fail'), 10);
    const time = parseInt(params.get('time'), 10);

    gameState.attemptsToday = attempt > 0 ? attempt : 1;
    gameState.firstWrongFloor = fail >= 1 && fail <= 10 ? fail : null;
    gameState.timeElapsedSeconds = time >= 0 ? time : 92;

    setRulesButtonVisible(false);
    const landing = document.getElementById('landing-screen');
    if (landing) landing.style.display = 'none';
    handleVictory();
}

function setRulesButtonVisible(visible) {
    const rulesBtn = document.getElementById('btn-rules');
    if (rulesBtn) rulesBtn.style.display = visible ? '' : 'none';
}

function resetToLandingScreen() {
    stopSessionTimer();
    const screens = ['victory-screen', 'game-screen', 'floor-hud-container', 'gameplay-header', 'active-game-timer', 'footer-text'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const landing = document.getElementById('landing-screen');
    if (landing) landing.style.display = 'flex';
    setRulesButtonVisible(true);
}

function showScreen(screenId) {
    const victoryScreen = document.getElementById('victory-screen');
    if (victoryScreen) victoryScreen.style.display = 'none';

    const screens = ['landing-screen', 'game-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = (id === screenId) ? 'flex' : 'none';
        }
    });
    if (screenId === 'landing-screen') {
        triggerLandingPageDing();
    }
}


// ==========================================
// 4. SOUND TOGGLE CONTROLS
// ==========================================

function updateSoundUI() {
    const label = `SOUND: ${gameState.soundEnabled ? 'ON' : 'OFF'}`;
    safeSetText('btn-sound-toggle', label);
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    if (gameState.soundEnabled) {
        playElevatorDing();
    }
    updateSoundUI();
}


// ==========================================
// 5. MODAL, STATS & HIGH-SPEED VAULT CONTROLS
// ==========================================

function openModal(modalId) {
    safeToggleClass(modalId, 'hidden', false);
}

function closeModal(modalId) {
    safeToggleClass(modalId, 'hidden', true);
}

function openVault() {
    renderStatsUI();
    populateVault();
    openModal('modal-vault');
}

function renderStatsUI() {
    const winRate = gameState.stats.played > 0 
        ? Math.round((gameState.stats.wins / gameState.stats.played) * 100) 
        : 0;

    safeSetText('stat-played', gameState.stats.played);
    safeSetText('stat-wins', gameState.stats.wins);
    safeSetText('stat-winrate', `${winRate}%`);
    safeSetText('stat-streak', gameState.stats.streak);

    const bestEl = document.getElementById('stat-bestfloor');
    if (bestEl) {
        bestEl.innerHTML = getOrdinalFloorHTML(gameState.stats.bestFloor);
    }

    const bestTimeEl = document.getElementById('stat-besttime');
    if (bestTimeEl) {
        bestTimeEl.textContent = formatTime(gameState.stats.bestTimeSeconds);
    }

    // v0.5: falls by floor (wrong answer or timeout)
    const fallsEl = document.getElementById('stat-falls');
    if (fallsEl) {
        const by = gameState.stats.fallsByFloor || {};
        const floors = Object.keys(by).map(Number).sort((a, b) => a - b);
        if (floors.length === 0) {
            fallsEl.innerHTML = '';
            fallsEl.style.display = 'none';
        } else {
            fallsEl.style.display = 'block';
            fallsEl.innerHTML = '<div class="falls-title">Falls by floor</div>' + floors.map(f => {
                const rec = by[f] || {};
                const parts = [];
                if (rec.wrong) parts.push(`${rec.wrong} wrong`);
                if (rec.timeout) parts.push(`${rec.timeout} timeout`);
                return `<div class="falls-row"><span>${ordinal(f)} Floor</span><span>${parts.join(' · ')}</span></div>`;
            }).join('');
        }
    }
}

async function populateVault() {
    const vaultList = document.getElementById('vault-list');
    if (!vaultList) return;
    
    vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">Loading Archives...</div>';
    
    // v0.6: use the manifest's replay list when there is one
    const replayManifest = await loadManifest();
    if (replayManifest) {
        const slots = getReplayList(replayManifest);
        vaultList.innerHTML = '';
        if (slots.length === 0) {
            vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">No archives found.</div>';
        } else {
            slots.forEach(n => {
                const id = pad2(n);
                const btn = document.createElement('button');
                btn.className = 'vault-item-btn';
                btn.innerHTML = `<strong>Archive ${id}</strong>`;
                btn.onclick = async () => {
                    triggerHaptic(15);
                    const setData = await fetchFileWithFallbacks(`sandbox.${id}.json`);
                    if (setData) loadVaultSet(id, setData);
                };
                vaultList.appendChild(btn);
            });
        }
        return;
    }

    const BATCH_SIZE = 5;
    const MAX_ARCHIVES = 100;
    const buttons = [];
    let currentId = 1;

    while (currentId <= MAX_ARCHIVES) {
        const batchPromises = [];
        for (let i = 0; i < BATCH_SIZE && (currentId + i) <= MAX_ARCHIVES; i++) {
            const idNum = currentId + i;
            const paddedId = String(idNum).padStart(2, '0');
            const filename = `sandbox.${paddedId}.json`;
            batchPromises.push(
                fetchFileWithFallbacks(filename).then(data => ({ id: paddedId, idNum, data }))
            );
        }

        const batchResults = await Promise.all(batchPromises);
        let missingFound = false;

        for (const res of batchResults) {
            if (res.data) {
                const btn = document.createElement('button');
                btn.className = 'vault-item-btn';
                btn.innerHTML = `<strong>Archive ${res.id}</strong>`;
                btn.onclick = () => {
                    triggerHaptic(15);
                    loadVaultSet(res.id, res.data);
                };
                buttons.push(btn);
            } else {
                missingFound = true;
            }
        }

        if (missingFound) break;
        currentId += BATCH_SIZE;
    }

    vaultList.innerHTML = '';
    if (buttons.length === 0) {
        vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">No archives found.</div>';
    } else {
        buttons.forEach(btn => vaultList.appendChild(btn));
    }
}


// ==========================================
// 6. DATA LOADING & NORMALIZATION
// ==========================================

// ==========================================
// v0.6: QUEUE + MANIFEST
// questions-manifest.json holds the dated queue (which set plays on which day) and the
// replay shelf. The game day changes at 03:00 London time, all year round.
// If the manifest is missing, or has no entry for today, the game uses questions.json
// and the old file-by-file archive list, exactly as before.
// ==========================================
let manifestData = null;

function pad2(n) {
    return String(n).padStart(2, '0');
}

// Game day as "YYYY-MM-DD". Before 03:00 London wall-clock time it is still yesterday.
function getGameDayKey(now) {
    now = now || new Date();
    try {
        const parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/London', year: 'numeric', month: '2-digit',
            day: '2-digit', hour: '2-digit', hourCycle: 'h23'
        }).formatToParts(now);
        const get = (t) => parseInt(parts.find(p => p.type === t).value, 10);
        const day = new Date(Date.UTC(get('year'), get('month') - 1, get('day')));
        if (get('hour') < 3) day.setUTCDate(day.getUTCDate() - 1);
        return day.toISOString().slice(0, 10);
    } catch (e) {
        // Browser without time zone support: use the device clock, same 03:00 rule
        const d = new Date(now.getTime() - 3 * 60 * 60 * 1000);
        return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    }
}

async function loadManifest() {
    if (manifestData) return manifestData;
    try {
        const res = await fetch('./questions-manifest.json', { cache: 'no-cache' });
        if (res.ok) {
            const m = await res.json();
            if (m && Array.isArray(m.queue) && m.queue.length > 0) manifestData = m;
        }
    } catch (e) {}
    return manifestData;
}

// Which set plays today? Returns a set number, or null (keep questions.json).
function pickQueuedSlot(m) {
    const key = getGameDayKey();
    const hit = m.queue.find(q => q.date === key);
    if (hit) return hit.set;
    const lastDate = m.queue.reduce((a, q) => (q.date > a ? q.date : a), '');
    if (key > lastDate) {
        // Queue has run dry: replay a set rather than show a blank page
        const pool = [...(m.replay || []), ...m.queue.map(q => q.set)];
        if (pool.length > 0) {
            const dayNumber = Math.floor(Date.parse(key + 'T00:00:00Z') / 86400000);
            return pool[dayNumber % pool.length];
        }
    }
    return null; // before the queue starts
}

// Replay list: the shelf, then every queued set whose day has passed (oldest first)
function getReplayList(m) {
    const key = getGameDayKey();
    const played = m.queue.filter(q => q.date < key)
        .sort((a, b) => (a.date < b.date ? -1 : 1)).map(q => q.set);
    const seen = {};
    return [...(m.replay || []), ...played].filter(n => (seen[n] ? false : (seen[n] = true)));
}

function normalizeQuestions(data) {
    let rawList = [];
    if (!data) return generateFallbackQuestions();
    
    if (Array.isArray(data)) rawList = data;
    else if (Array.isArray(data.floors)) rawList = data.floors;
    else if (Array.isArray(data.questions)) rawList = data.questions;
    else return generateFallbackQuestions();

    return rawList.map(q => {
        const options = Array.isArray(q.options) ? [...q.options] : ["Option A", "Option B", "Option C", "Option D"];
        
        let answerText = "";
        if (typeof q.answer === 'string') answerText = q.answer;
        else if (typeof q.correct === 'string') answerText = q.correct;
        else if (typeof q.correctAnswer === 'string') answerText = q.correctAnswer;
        else if (typeof q.correct_answer === 'string') answerText = q.correct_answer;
        else if (typeof q.answerIndex === 'number' && options[q.answerIndex]) answerText = options[q.answerIndex];
        else if (typeof q.correctIndex === 'number' && options[q.correctIndex]) answerText = options[q.correctIndex];
        else if (typeof q.correct === 'number' && options[q.correct]) answerText = options[0];
        else if (typeof q.answer === 'number' && options[q.answer]) answerText = options[0];
        else answerText = options[0];

        return {
            question: q.question || "Question missing",
            options: options,
            answer: answerText
        };
    });
}

async function fetchFileWithFallbacks(filename) {
    const candidatePaths = [
        `./archives/${filename}`,
        `./${filename}`,
        `./assets/data/floors/${filename}`,
        `./data/${filename}`,
        filename
    ];

    for (const path of candidatePaths) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {}
    }
    return null;
}

async function startDailyClimb() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    gameState.batchIndex = dayOfYear % floorMessageBatches.length;

    let data = null;
    // v0.6: today's queued set, if there is a manifest with an entry for today
    const queueManifest = await loadManifest();
    if (queueManifest) {
        const slot = pickQueuedSlot(queueManifest);
        if (slot !== null) data = await fetchFileWithFallbacks(`sandbox.${pad2(slot)}.json`);
    }
    if (!data) data = await fetchFileWithFallbacks('questions.json');
    if (!data) data = await fetchFileWithFallbacks('sandbox.01.json');

    if (data) {
        gameState.questions = normalizeQuestions(data);
    } else {
        gameState.questions = generateFallbackQuestions();
    }
    
    launchGameUI();
}

function loadVaultSet(paddedId, data) {
    if (data) {
        const archiveNum = parseInt(paddedId, 10) || 1;
        gameState.batchIndex = archiveNum % floorMessageBatches.length;
        gameState.questions = normalizeQuestions(data);
        closeModal('modal-vault');
        launchGameUI();
    }
}

function launchGameUI() {
    const landing = document.getElementById('landing-screen');
    const victory = document.getElementById('victory-screen');
    const hud = document.getElementById('floor-hud-container');
    const workspace = document.getElementById('game-workspace');
    const header = document.getElementById('gameplay-header');
    const footer = document.getElementById('footer-text');

    if (landing) landing.style.display = 'none';
    if (victory) victory.style.display = 'none';
    if (hud) hud.style.display = 'flex';
    if (workspace) workspace.style.display = 'flex';
    if (header) header.style.display = 'flex';
    if (footer) footer.style.display = 'block';

    setRulesButtonVisible(false); // v0.5

    // A fresh launch resets the clock. It starts again when question 1 appears.
    stopSessionTimer();
    startGame();
}


// ==========================================
// LIFT RIDE (opening ride and rise between floors)
// ==========================================

const LIFT_OPENING_MS = 1400;
const LIFT_RISE_MS = 1000;
const LIFT_VICTORY_MS = 2000;
const ANSWER_FLASH_MS = 400; // v0.5: was 800
let liftRideToken = 0;
let liftFirstRideDone = false;

function playLiftRide(durationMs, onArrive, options) {
    const overlay = document.getElementById('lift-overlay');
    const graphic = document.getElementById('lift-graphic');

    // If the overlay markup is missing, never block the game.
    if (!overlay || !graphic) {
        onArrive();
        return;
    }

    const myToken = ++liftRideToken;
    let finished = false;
    let arriveTimeout = null;

    const finish = () => {
        if (finished || myToken !== liftRideToken) return;
        finished = true;
        clearTimeout(arriveTimeout);
        overlay.onclick = null;
        onArrive();
        overlay.classList.add('hidden');
        graphic.classList.remove('rising');
    };

    graphic.classList.remove('rising');
    graphic.style.setProperty('--lift-ms', `${durationMs}ms`);
    overlay.classList.toggle('victory', !!(options && options.victory));
    overlay.classList.remove('hidden');
    void graphic.offsetWidth;
    graphic.classList.add('rising');

    arriveTimeout = setTimeout(finish, durationMs);

    // Tap to skip. Short delay so the tap that started the ride cannot skip it.
    setTimeout(() => {
        if (!finished && myToken === liftRideToken) {
            overlay.onclick = finish;
        }
    }, 250);
}


// ==========================================
// 7. GAME LOOP & ELEVATOR PROGRESSION
// ==========================================

function startGame() {
    if (!gameState.questions || gameState.questions.length === 0) {
        gameState.questions = generateFallbackQuestions();
    }
    gameState.currentFloor = 1;
    gameState.currentQuestionIndex = 0;
    showScreen('game-screen');
    
    const hud = document.getElementById('floor-hud-container');
    const header = document.getElementById('gameplay-header');
    if (hud) hud.style.display = 'flex';
    if (header) header.style.display = 'flex';

    updateFloorUI();

    const openingMs = liftFirstRideDone ? LIFT_RISE_MS : LIFT_OPENING_MS;
    liftFirstRideDone = true;
    playLiftRide(openingMs, () => {
        if (!gameState.timerInterval) startSessionTimer();
        loadNextQuestion();
    });
}

function resetGame() {
    clearInterval(gameState.timer);
    gameState.currentFloor = 1;
}

function updateFloorUI() {
    const cardFloorEl = document.getElementById('card-floor-text');
    if (cardFloorEl) {
        cardFloorEl.innerHTML = getOrdinalFloorHTML(gameState.currentFloor) + ' <span style="color: #ffffff;">Floor</span>';
    }
    
    const activeBatch = floorMessageBatches[gameState.batchIndex % floorMessageBatches.length] || floorMessageBatches[0];
    const ruleMsg = activeBatch[gameState.currentFloor - 1] || "No mistakes!";
    safeSetText('floor-rule-text', ruleMsg);

    document.querySelectorAll('.tower-floor, .floor-block').forEach(block => {
        const floorNum = parseInt(block.getAttribute('data-floor'), 10);
        block.classList.toggle('active', floorNum === gameState.currentFloor);
        block.classList.toggle('active-floor', floorNum === gameState.currentFloor);
        block.classList.toggle('completed', floorNum < gameState.currentFloor);
        block.classList.remove('failed');
    });
}

// v0.5: replace every option button with a brand-new element so no colour,
// focus, hover or transition can carry over to the same position next floor.
function rebuildOptionButtons() {
    const oldButtons = document.querySelectorAll('#options-grid .btn-option');
    oldButtons.forEach(oldBtn => {
        const fresh = oldBtn.cloneNode(false);
        fresh.className = 'btn-option';
        fresh.style.transition = 'none';
        if (oldBtn.parentNode) oldBtn.parentNode.replaceChild(fresh, oldBtn);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            fresh.style.transition = '';
        }));
    });
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
    }
}

function loadNextQuestion() {
    rebuildOptionButtons();
    startQuestionTimer();
    
    const currentQ = gameState.questions[gameState.currentQuestionIndex];
    if (!currentQ) return;

    safeSetText('question-text', currentQ.question);
    
    const shuffledOptions = shuffleArray(currentQ.options);
    
    const optionButtons = document.querySelectorAll('#options-grid .btn-option');
    optionButtons.forEach((btn, idx) => {
        const optionVal = shuffledOptions[idx] || null;
        btn.textContent = optionVal || '';
        btn.style.display = optionVal ? 'block' : 'none';
        
        const isCorrect = (optionVal === currentQ.answer);
        btn.onclick = () => handleAnswerSelect(isCorrect, btn); 
    });
}

function startQuestionTimer() {
    clearInterval(gameState.timer);
    const totalDuration = 15000;
    const startTime = Date.now();
    gameState.timeLeft = 15;
    const timerBar = document.getElementById('timer-bar');
    
    if (timerBar) {
        timerBar.style.width = '100%';
        timerBar.style.backgroundColor = 'var(--state-active)';
    }

    gameState.timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalDuration - elapsed);
        gameState.timeLeft = Math.ceil(remaining / 1000);

        if (timerBar) {
            timerBar.style.width = `${(remaining / totalDuration) * 100}%`;
            if (remaining <= totalDuration / 2) {
                timerBar.style.backgroundColor = 'var(--state-error)';
            } else {
                timerBar.style.backgroundColor = 'var(--state-active)';
            }
        }

        if (remaining <= 0) {
            clearInterval(gameState.timer);
            handleGameOver('TIME EXPIRED', 'timeout');
        }
    }, 50);
}

function handleAnswerSelect(isCorrect, buttonEl) {
    clearInterval(gameState.timer);
    
    document.querySelectorAll('#options-grid .btn-option').forEach(btn => {
        btn.onclick = null;
        if (typeof btn.blur === 'function') {
            btn.blur();
        }
    });
    
    if (isCorrect) {
        if (buttonEl) buttonEl.classList.add('selected-correct');
        playElevatorDing();
        triggerHaptic([35, 40, 35]);
        
        setTimeout(() => {
            if (gameState.currentFloor >= gameState.maxFloors) {
                playLiftRide(LIFT_VICTORY_MS, handleVictory, { victory: true });
            } else {
                playLiftRide(LIFT_RISE_MS, () => {
                    gameState.currentFloor++;
                    gameState.currentQuestionIndex++;
                    if (gameState.currentFloor > gameState.stats.bestFloor) {
                        gameState.stats.bestFloor = gameState.currentFloor;
                    }
                    updateFloorUI();
                    loadNextQuestion();
                });
            }
        }, ANSWER_FLASH_MS);
    } else {
        if (buttonEl) buttonEl.classList.add('selected-wrong');
        triggerHaptic([80, 50, 120]);
        
        const activeBlock = document.querySelector(`.tower-floor[data-floor="${gameState.currentFloor}"]`);
        if (activeBlock) activeBlock.classList.add('failed');

        // v0.5: first wrong answer of the session, on any attempt. Timeouts never set this.
        if (gameState.firstWrongFloor === null) {
            gameState.firstWrongFloor = gameState.currentFloor;
        }

        setTimeout(() => {
            handleGameOver('INCORRECT ANSWER', 'wrong');
        }, ANSWER_FLASH_MS);
    }
}

function handleGameOver(reason, type) {
    // Session stopwatch timer continues running during game over modals until victory
    gameState.stats.played++;
    gameState.stats.streak = 0;
    recordFall(gameState.currentFloor, type); // v0.5
    saveStats();
    
    safeSetText('game-over-title', 'ELEVATOR STOPPED');
    safeSetText('game-over-message', reason);
    
    const ord = ordinal(gameState.currentFloor);
    const finalEl = document.getElementById('final-floor-reached');
    if (finalEl) {
        finalEl.innerHTML = `Stopped at <span style="color: var(--state-error, #EF4444); font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
    }
    
    openModal('modal-game-over');
}

function handleVictory() {
    stopSessionTimer();
    gameState.currentFloor = 11;
    gameState.stats.played++;
    gameState.stats.wins++;
    gameState.stats.streak++;
    gameState.stats.bestFloor = 11;

    if (gameState.stats.bestTimeSeconds === null || gameState.timeElapsedSeconds < gameState.stats.bestTimeSeconds) {
        gameState.stats.bestTimeSeconds = gameState.timeElapsedSeconds;
    }

    saveStats();
    
    triggerHaptic([50, 50, 50, 50, 100]);
    
    const victoryTimeDisplay = document.getElementById('victory-time-display');
    const badgeDisplay = document.getElementById('receipt-badge-display');
    const dateDisplay = document.getElementById('receipt-date-display');
    const runSummaryDisplay = document.getElementById('victory-run-summary-display');
    const hudContainer = document.getElementById('floor-hud-container');
    const gameWorkspace = document.getElementById('game-workspace');
    const gameplayHeader = document.getElementById('gameplay-header');
    const activeGameTimer = document.getElementById('active-game-timer');
    const victoryScreen = document.getElementById('victory-screen');
    const footerText = document.getElementById('footer-text');

    if (victoryTimeDisplay) victoryTimeDisplay.textContent = formatTime(gameState.timeElapsedSeconds);
    if (dateDisplay) dateDisplay.textContent = getFormattedDateString();

    // v0.5: attempt line reads "on 1st attempt", "on 2nd attempt", ...
    if (badgeDisplay) {
        badgeDisplay.textContent = `on ${ordinal(gameState.attemptsToday)} attempt`;
    }

    // v0.5: Accuracy. Green 10/10 = no wrong answer all session.
    // Otherwise red = floor of the first wrong answer, green 10.
    if (runSummaryDisplay) {
        const red = gameState.firstWrongFloor;
        const left = red === null ? '10' : String(red);
        const leftColour = red === null ? 'var(--state-success)' : 'var(--state-error)';
        runSummaryDisplay.innerHTML = `<span style="color: ${leftColour};">${left}</span><span style="color: var(--text-muted);">/</span><span style="color: var(--state-success);">10</span>`;
    }

    if (hudContainer) hudContainer.style.display = 'none';
    if (gameWorkspace) gameWorkspace.style.display = 'none';
    if (gameplayHeader) gameplayHeader.style.display = 'none';
    if (activeGameTimer) activeGameTimer.style.display = 'none';
    if (footerText) footerText.style.display = 'none';

    if (victoryScreen) victoryScreen.style.display = 'flex';
}

function generateFallbackQuestions() {
    return [
        { question: "Which planet in our solar system is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "What is the capital city of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], answer: "Paris" },
        { question: "How many sides does a hexagon have?", options: ["6", "5", "7", "8"], answer: "6" },
        { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Silver"], answer: "Oxygen" },
        { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"], answer: "Leonardo da Vinci" },
        { question: "What is the largest ocean on Earth?", options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
        { question: "In which year did the Apollo 11 moon landing take place?", options: ["1969", "1965", "1972", "1975"], answer: "1969" },
        { question: "What is the hardest natural substance on Earth?", options: ["Diamond", "Quartz", "Granite", "Titanium"], answer: "Diamond" },
        { question: "Which musical instrument has 88 keys?", options: ["Piano", "Organ", "Harpsichord", "Accordion"], answer: "Piano" },
        { question: "What gas do plants absorb during photosynthesis?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" }
    ];
}
