// ==========================================================================
// 11th Floor TYKB (Think You Know Ball?) — Core Game Engine
// ==========================================================================

function safeAddListener(id, event, handler) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('pointerdown', () => {
            triggerHaptic(15);
            unlockAudioContext();
        });
        el.addEventListener(event, (e) => {
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

function getOrdinalFloorHTML(floorNum) {
    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
    const ord = ordinals[floorNum - 1] || `${floorNum}th`;
    return `<span style="color: var(--genre-pitch, #22c55e); font-weight: 800;">${ord}</span>`;
}

function getFailedOrdinalFloorHTML(floorNum) {
    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
    const ord = ordinals[floorNum - 1] || `${floorNum}th`;
    return `<span style="color: var(--state-error, #EF4444); font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
}

function getFormattedDateString() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const dayName = days[now.getDay()];
    const dayNum = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    let suffix = "th";
    if (dayNum === 1 || dayNum === 21 || dayNum === 31) suffix = "st";
    else if (dayNum === 2 || dayNum === 22) suffix = "nd";
    else if (dayNum === 3 || dayNum === 23) suffix = "rd";

    return `${dayName} ${dayNum}${suffix} ${monthName} ${year}`;
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
// STATE MANAGEMENT & PERSISTENCE
// ==========================================

const gameState = {
    currentFloor: 1,
    maxFloors: 10,
    soundEnabled: true,
    timer: null,
    timeLeft: 20,
    questions: [],
    currentQuestionIndex: 0,
    batchIndex: 0,
    startTime: 0,
    timerInterval: null,
    timeElapsedSeconds: 0,
    attemptsToday: 1,
    firstTryCollapseFloor: null,
    stats: {
        played: 0,
        wins: 0,
        streak: 0,
        bestFloor: 1,
        bestTimeSeconds: null
    }
};

let isStartClimbLoading = false;
let audioUnlocked = false;

const STATS_KEY = '11th_floor_tykb_stats';

const floorMessageBatches = [
    [
        "KEEP CLIMBING",
        "STAY SHARP",
        "WELL DONE",
        "FLOOR CLEARED",
        "HALFWAY THERE",
        "PURE PRECISION",
        "KEEP GOING",
        "SO CLOSE",
        "NEARLY THERE",
        "FINAL STEP"
    ]
];

function loadSavedStats() {
    try {
        const saved = localStorage.getItem(STATS_KEY);
        if (saved) {
            gameState.stats = { ...gameState.stats, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn('Could not load stats from localStorage.');
    }
}

function saveStats() {
    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(gameState.stats));
    } catch (e) {
        console.warn('Could not save stats to localStorage.');
    }
}

loadSavedStats();

// ==========================================
// GAMEPLAY SESSION STOPWATCH TIMER
// ==========================================

function startSessionTimer() {
    if (!gameState.timerInterval) {
        gameState.timeElapsedSeconds = 0;
        gameState.startTime = Date.now();
        const activeGameTimer = document.getElementById("active-game-timer");
        if (activeGameTimer) {
            activeGameTimer.style.display = "block";
            activeGameTimer.textContent = "00:00";
        }
        gameState.timerInterval = setInterval(updateSessionTimerDisplay, 1000);
    }
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
// AUDIO ENGINE & IN-APP BROWSER UNLOCK
// ==========================================

const elevatorDingAudio = new Audio();
elevatorDingAudio.src = 'ding.mp3';

function unlockAudioContext() {
    if (audioUnlocked) return;
    try {
        elevatorDingAudio.play().then(() => {
            elevatorDingAudio.pause();
            elevatorDingAudio.currentTime = 0;
            audioUnlocked = true;
        }).catch(() => {});
    } catch (e) {}
}

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
// NAVIGATION & CONTROLS
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

    updateSoundUI();
});

function resetToLandingScreen() {
    stopSessionTimer();
    showScreen('landing-screen');
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
// MODAL & HIGH-SPEED VAULT CONTROLS
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
}

async function populateVault() {
    const vaultList = document.getElementById('vault-list');
    if (!vaultList) return;
    
    vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">Loading Archives...</div>';
    
    const BATCH_SIZE = 5;
    const MAX_ARCHIVES = 50;
    const buttons = [];
    let currentId = 1;

    while (currentId <= MAX_ARCHIVES) {
        const batchPromises = [];
        for (let i = 0; i < BATCH_SIZE && (currentId + i) <= MAX_ARCHIVES; i++) {
            const idNum = currentId + i;
            const paddedId = String(idNum).padStart(2, '0');
            
            batchPromises.push(
                (async () => {
                    let data = await fetchFileWithFallbacks(`sandbox-ball.${paddedId}.json`);
                    if (!data) {
                        data = await fetchFileWithFallbacks(`ball.${String(idNum).padStart(3, '0')}.json`);
                    }
                    return { id: paddedId, idNum, data };
                })()
            );
        }

        const batchResults = await Promise.all(batchPromises);

        for (const res of batchResults) {
            if (res.data) {
                const btn = document.createElement('button');
                btn.className = 'vault-item-btn';
                btn.innerHTML = `<strong>Archive ${res.id}</strong>`;
                btn.onpointerdown = () => triggerHaptic(15);
                btn.onclick = () => {
                    loadVaultSet(res.id, res.data);
                };
                buttons.push(btn);
            }
        }

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
// DATA LOADING & NORMALIZATION
// ==========================================

function normalizeQuestions(data) {
    let rawList = [];
    if (!data) return [];
    
    if (Array.isArray(data)) rawList = data;
    else if (Array.isArray(data.floors)) rawList = data.floors;
    else if (Array.isArray(data.questions)) rawList = data.questions;

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

    const fetchSingle = async (path) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        try {
            const res = await fetch(path, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            clearTimeout(timeoutId);
        }
        throw new Error('Fetch failed');
    };

    try {
        return await Promise.any(candidatePaths.map(path => fetchSingle(path)));
    } catch (e) {
        return null;
    }
}

async function startDailyClimb() {
    if (isStartClimbLoading) return;
    isStartClimbLoading = true;

    const startBtn = document.getElementById('btn-start-climb');
    if (startBtn) {
        startBtn.textContent = "LOADING...";
        startBtn.style.opacity = "0.7";
    }

    try {
        let data = await fetchFileWithFallbacks('ball-questions.json');
        if (!data) data = await fetchFileWithFallbacks('sandbox-ball.32.json');
        if (!data) data = await fetchFileWithFallbacks('sandbox-ball.23.json');

        if (data) {
            gameState.questions = normalizeQuestions(data);
        }
    } catch (err) {
        console.error('Error fetching climb questions:', err);
    } finally {
        isStartClimbLoading = false;
        if (startBtn) {
            startBtn.textContent = "Start Climb";
            startBtn.style.opacity = "1.0";
        }
    }

    launchGameUI();
}

function loadVaultSet(paddedId, data) {
    if (data) {
        gameState.questions = normalizeQuestions(data);
        closeModal('modal-vault');
        launchGameUI();
    }
}

function launchGameUI() {
    startSessionTimer();
    startGame();
}

// ==========================================
// GAME LOOP & ELEVATOR PROGRESSION
// ==========================================

function startGame() {
    gameState.currentFloor = 1;
    gameState.currentQuestionIndex = 0;
    showScreen('game-screen');
    
    updateFloorUI();
    loadNextQuestion();
}

function updateFloorUI() {
    const cardFloorEl = document.getElementById('card-floor-text');
    if (cardFloorEl) {
        cardFloorEl.innerHTML = getOrdinalFloorHTML(gameState.currentFloor) + ' <span style="color: #ffffff;">Floor</span>';
    }
    
    const activeBatch = floorMessageBatches[0];
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

function loadNextQuestion() {
    document.querySelectorAll('#options-grid .btn-option').forEach(btn => {
        btn.classList.remove('selected-correct', 'selected-wrong');
    });

    startQuestionTimer();
    
    const currentQ = gameState.questions[gameState.currentQuestionIndex];
    if (!currentQ) return;

    safeSetText('question-text', currentQ.question);
    
    const shuffledOptions = shuffleArray(currentQ.options);
    
    const optionButtons = document.querySelectorAll('#options-grid .btn-option');
    optionButtons.forEach((btn, idx) => {
        btn.className = 'btn-option';
        btn.classList.remove('selected-correct', 'selected-wrong');
        
        if (typeof btn.blur === 'function') {
            btn.blur();
        }
        
        const optionVal = shuffledOptions[idx] || null;
        btn.textContent = optionVal || '';
        btn.style.display = optionVal ? 'block' : 'none';
        
        const isCorrect = (optionVal === currentQ.answer);
        
        btn.onpointerdown = () => {
            triggerHaptic(15);
        };
        btn.onclick = () => handleAnswerSelect(isCorrect, btn); 
    });
}

function startQuestionTimer() {
    clearInterval(gameState.timer);
    const totalDuration = 20000;
    const startTime = Date.now();
    gameState.timeLeft = 20;
    const timerBar = document.getElementById('timer-bar');
    
    if (timerBar) {
        timerBar.style.width = '100%';
        timerBar.style.backgroundColor = 'var(--genre-pitch)';
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
                timerBar.style.backgroundColor = 'var(--genre-pitch)';
            }
        }

        if (remaining <= 0) {
            clearInterval(gameState.timer);
            handleGameOver('TIME EXPIRED');
        }
    }, 50);
}

function handleAnswerSelect(isCorrect, buttonEl) {
    clearInterval(gameState.timer);
    
    const currentQ = gameState.questions[gameState.currentQuestionIndex];

    document.querySelectorAll('#options-grid .btn-option').forEach(btn => {
        btn.onclick = null;
        btn.onpointerdown = null;
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
                handleVictory();
            } else {
                gameState.currentFloor++;
                gameState.currentQuestionIndex++;
                if (gameState.currentFloor > gameState.stats.bestFloor) {
                    gameState.stats.bestFloor = gameState.currentFloor;
                }
                updateFloorUI();
                loadNextQuestion();
            }
        }, 400);
    } else {
        if (buttonEl) buttonEl.classList.add('selected-wrong');
        
        if (currentQ) {
            document.querySelectorAll('#options-grid .btn-option').forEach(btn => {
                if (btn.textContent === currentQ.answer) {
                    btn.classList.add('selected-correct');
                }
            });
        }

        triggerHaptic([80, 50, 120]);
        
        const activeBlock = document.querySelector(`.tower-floor[data-floor="${gameState.currentFloor}"]`);
        if (activeBlock) activeBlock.classList.add('failed');

        if (gameState.attemptsToday === 1 && gameState.firstTryCollapseFloor === null) {
            gameState.firstTryCollapseFloor = gameState.currentFloor;
        }

        setTimeout(() => {
            handleGameOver('INCORRECT ANSWER');
        }, 400);
    }
}

function handleGameOver(reason) {
    gameState.stats.played++;
    gameState.stats.streak = 0;
    saveStats();
    
    safeSetText('game-over-title', 'ELEVATOR STOPPED');
    safeSetText('game-over-message', reason);
    
    const finalEl = document.getElementById('final-floor-reached');
    if (finalEl) {
        finalEl.innerHTML = `Stopped at ${getFailedOrdinalFloorHTML(gameState.currentFloor)}`;
    }
    
    openModal('modal-game-over');
}

function handleVictory() {
    stopSessionTimer();
    gameState.currentFloor = 11;
    gameState.stats.played++;
    gameState.stats.wins++;
    
    if (gameState.attemptsToday === 1) {
        gameState.stats.streak++;
    }
    
    gameState.stats.bestFloor = 11;

    if (gameState.stats.bestTimeSeconds === null || gameState.timeElapsedSeconds < gameState.stats.bestTimeSeconds) {
        gameState.stats.bestTimeSeconds = gameState.timeElapsedSeconds;
    }

    saveStats();
    
    triggerHaptic([50, 50, 50, 50, 100]);
    
    const dateDisplay = document.getElementById('receipt-date-display');
    const victoryTimeDisplay = document.getElementById('victory-time-display');
    const badgeDisplay = document.getElementById('receipt-badge-display');
    const attemptsDisplay = document.getElementById('victory-attempts-display');
    const runSummaryDisplay = document.getElementById('victory-run-summary-display');
    
    const gameScreen = document.getElementById('game-screen');
    const victoryScreen = document.getElementById('victory-screen');
    const footerText = document.getElementById('footer-text');

    if (dateDisplay) {
        dateDisplay.textContent = getFormattedDateString();
    }

    const formattedTime = formatTime(gameState.timeElapsedSeconds);
    if (victoryTimeDisplay) victoryTimeDisplay.textContent = formattedTime;

    if (attemptsDisplay) {
        attemptsDisplay.textContent = gameState.attemptsToday;
    }

    if (badgeDisplay) {
        const ords = ["1st", "2nd", "3rd", "4th", "5th"];
        const ordText = ords[gameState.attemptsToday - 1] || `${gameState.attemptsToday}th`;
        badgeDisplay.textContent = `${ordText} Try`;
    }

    if (runSummaryDisplay) {
        if (gameState.attemptsToday === 1) {
            runSummaryDisplay.innerHTML = `<span style="color: var(--genre-pitch);">10</span><span style="color: var(--text-muted);">/</span><span style="color: var(--genre-pitch);">10</span>`;
        } else {
            const failFloor = gameState.firstTryCollapseFloor || 3;
            runSummaryDisplay.innerHTML = `<span style="color: var(--state-error);">${failFloor}</span><span style="color: var(--text-muted);">/</span><span style="color: var(--genre-pitch);">10</span>`;
        }
    }

    if (gameScreen) gameScreen.style.display = 'none';
    if (footerText) footerText.style.display = 'none';
    if (victoryScreen) victoryScreen.style.display = 'flex';
}
