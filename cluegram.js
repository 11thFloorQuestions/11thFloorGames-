// ==========================================================================
// 11th Floor Cluegram — Core Interactive Game Engine & Archive Integration
// v0.5 changes (marked "v0.5"), same rules as TYKB and Questions:
//  - First wrong answer of the session recorded (a timeout never counts)
//  - Every fall logged in stats (floor + wrong/timeout)
//  - Attempt counter, receipt reads "on Nth attempt", date, Accuracy (x/10)
//  - Falls say "Ground Floor", never "1st floor"
//  - Flash after a correct answer is 0.4s (was 0.8s)
//  - Archive list loads in batches of 5 instead of 100 requests at once
//  - "?" rules pop-up, landing screen only
//  - Debug switch: cluegram.html?debug=win&attempt=3&fail=4&time=92
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Current Game State Variables
    let currentFloorIndex = 0; // 0 = 1st Floor, 9 = 10th Floor
    let userGuess = [];
    let rackTiles = [];
    let isProcessing = false;
    let soundEnabled = true;
    let activeGameData = [];

    // v0.5: attempt and accuracy tracking
    let attemptsToday = 1;
    let firstWrongFloor = null; // floor of first WRONG ANSWER (timeouts never count)
    let debugMode = false;
    
    // Timer Variables
    let startTime = 0;
    let timerInterval = null;
    let timeElapsedSeconds = 0;

    // Question Timer Bar Variables (20-Second Countdown)
    let questionTimer = null;
    let questionTimeLeft = 20;

    // Local Storage Player Stats Key
    const STATS_KEY = '11th_floor_cluegram_stats';

    // DOM Element References
    const startScreen = document.getElementById('start-screen');
    const startClimbBtn = document.getElementById('start-climb-btn');
    const hudContainer = document.getElementById('floor-hud-container');
    const gameWorkspace = document.getElementById('game-workspace');
    const gameControls = document.getElementById('game-controls');
    const gameplayHeader = document.getElementById('gameplay-header');
    
    const victoryScreen = document.getElementById('victory-screen');
    const victoryStatsBtn = document.getElementById('btn-victory-stats');
    const victoryTimeDisplay = document.getElementById('victory-time-display');
    const activeGameTimer = document.getElementById('active-game-timer');
    const footerText = document.getElementById('footer-text');
    
    const floorNumberVal = document.getElementById('floor-number-val');
    const floorRuleText = document.getElementById('floor-rule-text');
    const clueText = document.getElementById('clue-text');
    const targetSlotsContainer = document.getElementById('target-word-slots');
    const letterRackContainer = document.getElementById('letter-rack');
    const messageBox = document.getElementById('message-box');

    const backspaceBtn = document.getElementById('action-backspace-btn');
    const shuffleBtn = document.getElementById('action-shuffle-btn');
    const submitBtn = document.getElementById('action-submit-btn');

    const statsModal = document.getElementById('modal-vault');
    const statsBtn = document.getElementById('btn-landing-stats');
    const closeVaultBtn = document.getElementById('btn-close-vault');
    const soundBtn = document.getElementById('btn-sound');
    const vaultList = document.getElementById('vault-list');
    const rulesBtn = document.getElementById('btn-rules');
    const closeRulesBtn = document.getElementById('btn-close-rules');
    const rulesModal = document.getElementById('modal-rules');

    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
    const CORRECT_FLASH_MS = 400; // v0.5: was 800

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

    // v0.5: same date format as the other games, e.g. "Mon 19th Oct 2026"
    function getFormattedDateString() {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const now = new Date();
        return `${days[now.getDay()]} ${ordinal(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }

// ==========================================
// LIFT RIDE (opening ride and rise between floors)
// ==========================================

const LIFT_OPENING_MS = 1400;
const LIFT_RISE_MS = 1000;
const LIFT_VICTORY_MS = 2000;
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

    // Initialize Game Engine
    init();

    function getDailyDataset() {
        if (typeof window.CLUEGRAM_DAILY_SET !== 'undefined') {
            if (Array.isArray(window.CLUEGRAM_DAILY_SET)) {
                return window.CLUEGRAM_DAILY_SET;
            }
            if (window.CLUEGRAM_DAILY_SET && window.CLUEGRAM_DAILY_SET.floors && Array.isArray(window.CLUEGRAM_DAILY_SET.floors)) {
                return window.CLUEGRAM_DAILY_SET.floors;
            }
        }
        return [];
    }

    function init() {
        // Force Landing Screen visibility explicitly on initial load
        if (startScreen) startScreen.style.display = 'flex';
        if (hudContainer) hudContainer.style.display = 'none';
        if (gameWorkspace) gameWorkspace.style.display = 'none';
        if (gameControls) gameControls.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'none';
        if (victoryScreen) victoryScreen.style.display = 'none';

        activeGameData = getDailyDataset();
        bindEvents();
        updateStatsDisplay();
        runDebugSwitch();
    }

    // v0.5: jump straight to the victory screen for testing.
    // Example: cluegram.html?debug=win&attempt=3&fail=4&time=92
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

        attemptsToday = attempt > 0 ? attempt : 1;
        firstWrongFloor = fail >= 1 && fail <= 10 ? fail : null;
        timeElapsedSeconds = time >= 0 ? time : 92;

        setRulesButtonVisible(false);
        if (startScreen) startScreen.style.display = 'none';
        showVictoryReceipt();
    }

    function setRulesButtonVisible(visible) {
        if (rulesBtn) rulesBtn.style.display = visible ? '' : 'none';
    }

    function bindEvents() {
        if (startClimbBtn) startClimbBtn.addEventListener('click', startGame);
        if (backspaceBtn) backspaceBtn.addEventListener('click', handleBackspace);
        if (shuffleBtn) shuffleBtn.addEventListener('click', handleShuffle);
        if (submitBtn) submitBtn.addEventListener('click', handleSubmit);

        if (statsBtn) {
            statsBtn.addEventListener('click', () => {
                updateStatsDisplay();
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }

        if (victoryStatsBtn) {
            victoryStatsBtn.addEventListener('click', () => {
                updateStatsDisplay();
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }

        if (closeVaultBtn) {
            closeVaultBtn.addEventListener('click', () => {
                if (statsModal) statsModal.classList.add('hidden');
                if (victoryScreen && victoryScreen.style.display !== 'none') {
                    resetToStartScreen();
                }
            });
        }

        // v0.5: rules pop-up
        if (rulesBtn) rulesBtn.addEventListener('click', () => { if (rulesModal) rulesModal.classList.remove('hidden'); });
        if (closeRulesBtn) closeRulesBtn.addEventListener('click', () => { if (rulesModal) rulesModal.classList.add('hidden'); });

        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                soundEnabled = !soundEnabled;
                soundBtn.textContent = `SOUND: ${soundEnabled ? 'ON' : 'OFF'}`;
            });
        }

        document.addEventListener('keydown', (e) => {
            if (!gameWorkspace || gameWorkspace.style.display === 'none' || isProcessing) return;

            const key = e.key.toUpperCase();
            if (/^[A-Z]$/.test(key)) {
                selectFirstAvailableLetter(key);
            } else if (e.key === 'Backspace') {
                handleBackspace();
            } else if (e.key === 'Enter') {
                handleSubmit();
            }
        });
    }

    // --- Timer Functions ---
    function startTimer() {
        if (!timerInterval) {
            timeElapsedSeconds = 0;
            startTime = Date.now();
            if (activeGameTimer) {
                activeGameTimer.style.display = 'block';
                activeGameTimer.textContent = '00:00';
            }
            timerInterval = setInterval(updateTimerDisplay, 1000);
        }
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function updateTimerDisplay() {
        timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        if (activeGameTimer) {
            activeGameTimer.textContent = formatTime(timeElapsedSeconds);
        }
    }

    function formatTime(totalSeconds) {
        if (totalSeconds === null || totalSeconds === undefined) return "--:--";
        const m = Math.floor(totalSeconds / 60);
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    // --- 20-Second Question Timer Bar Engine ---
    function startQuestionTimer() {
        clearInterval(questionTimer);
        const totalDuration = 20000;
        const qStartTime = Date.now();
        questionTimeLeft = 20;
        const timerBar = document.getElementById('timer-bar');
        
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.backgroundColor = 'var(--state-active)';
        }

        questionTimer = setInterval(() => {
            const elapsed = Date.now() - qStartTime;
            const remaining = Math.max(0, totalDuration - elapsed);
            questionTimeLeft = Math.ceil(remaining / 1000);

            if (timerBar) {
                timerBar.style.width = `${(remaining / totalDuration) * 100}%`;
                if (remaining <= totalDuration / 2) {
                    timerBar.style.backgroundColor = 'var(--state-error)';
                } else {
                    timerBar.style.backgroundColor = 'var(--state-active)';
                }
            }

            if (remaining <= 0) {
                clearInterval(questionTimer);
                handleTimeExpired();
            }
        }, 50);
    }

    function stopQuestionTimer() {
        clearInterval(questionTimer);
    }

    function handleTimeExpired() {
        if (isProcessing) return;
        isProcessing = true;

        const slots = targetSlotsContainer ? targetSlotsContainer.querySelectorAll('.target-slot') : [];
        slots.forEach(slot => slot.classList.add('state-error'));
        showMessage('TIME EXPIRED — DROPPED TO GROUND FLOOR', false);

        const towerFloors = document.querySelectorAll('.tower-floor');
        const activeTowerFloor = Array.from(towerFloors).find(
            f => parseInt(f.dataset.floor) === currentFloorIndex + 1
        );
        if (activeTowerFloor) activeTowerFloor.classList.add('failed');

        // v0.5: a timeout is logged as a fall but never sets the first wrong answer
        recordGameResult(false, currentFloorIndex + 1, 'timeout');
        attemptsToday++;

        setTimeout(() => {
            currentFloorIndex = 0;
            rideToFirstFloor();
        }, 1500);
    }

    // --- Data Loading ---
    function fetchFileWithFallbacks(filename) {
        const candidatePaths = [`./archives/${filename}`, `./${filename}`, `./data/${filename}`, filename];
        return new Promise(async (resolve) => {
            for (const path of candidatePaths) {
                try {
                    const res = await fetch(path);
                    if (res.ok) return resolve(await res.json());
                } catch (e) {}
            }
            resolve(null);
        });
    }

    // v0.5: batches of 5, stops at the first batch with a missing file
    async function populateVault() {
        if (!vaultList) return;
        vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">Loading Archives...</div>';
        
        const BATCH_SIZE = 5;
        const MAX_ARCHIVES = 100;
        const buttons = [];
        let currentId = 1;

        while (currentId <= MAX_ARCHIVES) {
            const batchPromises = [];
            for (let i = 0; i < BATCH_SIZE && (currentId + i) <= MAX_ARCHIVES; i++) {
                const paddedId = String(currentId + i).padStart(2, '0');
                batchPromises.push(
                    fetchFileWithFallbacks(`cluegram-${paddedId}.json`).then(data => ({ id: paddedId, data }))
                );
            }

            const batchResults = await Promise.all(batchPromises);
            let missingFound = false;

            batchResults.forEach(({ id, data }) => {
                if (data) {
                    const btn = document.createElement('button');
                    btn.className = 'vault-item-btn';
                    btn.innerHTML = `<strong>Archive ${id}</strong>`;
                    btn.onclick = () => loadVaultArchive(id);
                    buttons.push(btn);
                } else {
                    missingFound = true;
                }
            });

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

    async function loadVaultArchive(paddedId) {
        const data = await fetchFileWithFallbacks(`cluegram-${paddedId}.json`);
        let extractedFloors = [];
        if (data) extractedFloors = Array.isArray(data) ? data : (data.floors || []);

        if (extractedFloors.length > 0) {
            activeGameData = extractedFloors;
            launchGameUI();
        } else {
            showMessage(`COULD NOT LOAD ARCHIVE ${paddedId}`, false);
        }
    }

    function startGame() {
        if (!activeGameData || activeGameData.length === 0) {
            activeGameData = getDailyDataset();
        }
        if (!activeGameData || activeGameData.length === 0) {
            console.warn('No cluegram dataset found.');
            return;
        }
        launchGameUI();
    }

    function launchGameUI() {
        if (startScreen) startScreen.style.display = 'none';
        if (victoryScreen) victoryScreen.style.display = 'none';
        if (hudContainer) hudContainer.style.display = 'flex';
        if (gameWorkspace) gameWorkspace.style.display = 'flex';
        if (gameControls) gameControls.style.display = 'flex';
        if (statsModal) statsModal.classList.add('hidden');
        if (gameplayHeader) gameplayHeader.style.display = 'flex';
        if (footerText) footerText.style.display = 'block';

        setRulesButtonVisible(false); // v0.5

        currentFloorIndex = 0;
        rideToFirstFloor();
    }

    // Lobby to the 1st floor: the opening ride, and the ride back after every fall.
    // The session clock starts (or keeps running) when floor 1 appears.
    function rideToFirstFloor() {
        isProcessing = true;
        prepareFloorOneHud();

        const rideMs = liftFirstRideDone ? LIFT_RISE_MS : LIFT_OPENING_MS;
        liftFirstRideDone = true;
        playLiftRide(rideMs, () => {
            startTimer();
            loadFloor(0);
        });
    }

    function prepareFloorOneHud() {
        updateTowerStack(1);
        if (floorNumberVal) floorNumberVal.innerHTML = getOrdinalFloorHTML(1);
        const firstFloor = activeGameData && activeGameData[0];
        if (floorRuleText && firstFloor) {
            floorRuleText.textContent = `${firstFloor.target.length}-letter Anagram • No mistakes!`;
        }
    }

    function resetToStartScreen() {
        stopTimer();
        stopQuestionTimer();
        if (victoryScreen) victoryScreen.style.display = 'none';
        if (hudContainer) hudContainer.style.display = 'none';
        if (gameWorkspace) gameWorkspace.style.display = 'none';
        if (gameControls) gameControls.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'none';
        if (activeGameTimer) activeGameTimer.style.display = 'none';
        if (startScreen) startScreen.style.display = 'flex';
        setRulesButtonVisible(true); // v0.5
    }

    // --- Core Logic ---
    function getOrdinalFloorHTML(floorNum) {
        const ord = ordinals[floorNum - 1] || `${floorNum}th`;
        return `<span style="color: var(--genre-magenta); font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
    }

    function loadFloor(index) {
        if (!activeGameData || index >= activeGameData.length) return;

        const floorData = activeGameData[index];
        userGuess = [];
        showMessage('', false);
        isProcessing = false;

        if (floorNumberVal) floorNumberVal.innerHTML = getOrdinalFloorHTML(index + 1);
        if (floorRuleText) floorRuleText.textContent = `${floorData.target.length}-letter Anagram • No mistakes!`;
        if (clueText) clueText.textContent = floorData.clue;

        updateTowerStack(index + 1);

        if (targetSlotsContainer) {
            targetSlotsContainer.innerHTML = '';
            for (let i = 0; i < floorData.target.length; i++) {
                const slot = document.createElement('div');
                slot.className = 'target-slot';
                slot.dataset.slotIndex = i;
                slot.addEventListener('click', () => handleSlotClick(i));
                targetSlotsContainer.appendChild(slot);
            }
        }

        rackTiles = floorData.scrambled.split('').map((char, i) => ({
            id: i,
            letter: char,
            used: false
        }));

        renderRack();
        startQuestionTimer();
    }

    function renderRack() {
        if (!letterRackContainer) return;
        letterRackContainer.innerHTML = '';
        rackTiles.forEach((tile) => {
            const tileElem = document.createElement('div');
            tileElem.className = `rack-tile ${tile.used ? 'used' : ''}`;
            tileElem.textContent = tile.letter;
            tileElem.addEventListener('click', () => handleTileClick(tile));
            letterRackContainer.appendChild(tileElem);
        });
        renderTargetSlots();
    }

    function renderTargetSlots() {
        if (!targetSlotsContainer) return;
        const slots = targetSlotsContainer.querySelectorAll('.target-slot');
        slots.forEach((slot, i) => {
            if (i < userGuess.length) {
                slot.textContent = userGuess[i].letter;
                slot.classList.add('filled');
            } else {
                slot.textContent = '';
                slot.classList.remove('filled');
            }
            slot.classList.remove('state-error', 'state-success');
        });
    }

    function handleTileClick(tile) {
        if (tile.used || isProcessing) return;
        const currentFloor = activeGameData[currentFloorIndex];
        if (userGuess.length < currentFloor.target.length) {
            tile.used = true;
            userGuess.push(tile);
            renderRack();
        }
    }

    function handleSlotClick(index) {
        if (isProcessing || index >= userGuess.length) return;
        const removedTile = userGuess.splice(index, 1)[0];
        const originalTile = rackTiles.find(t => t.id === removedTile.id);
        if (originalTile) originalTile.used = false;
        renderRack();
    }

    function selectFirstAvailableLetter(letter) {
        const availableTile = rackTiles.find(t => !t.used && t.letter === letter);
        if (availableTile) handleTileClick(availableTile);
    }

    function handleBackspace() {
        if (userGuess.length === 0 || isProcessing) return;
        const removedTile = userGuess.pop();
        const originalTile = rackTiles.find(t => t.id === removedTile.id);
        if (originalTile) originalTile.used = false;
        renderRack();
    }

    function handleShuffle() {
        if (isProcessing) return;
        for (let i = rackTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rackTiles[i], rackTiles[j]] = [rackTiles[j], rackTiles[i]];
        }
        renderRack();
    }

    function handleSubmit() {
        if (isProcessing) return;
        const currentFloor = activeGameData[currentFloorIndex];
        if (userGuess.length < currentFloor.target.length) {
            showMessage('FILL ALL SLOTS BEFORE SUBMITTING', false);
            return;
        }

        stopQuestionTimer();
        isProcessing = true;
        const submittedWord = userGuess.map(t => t.letter).join('');
        const slots = targetSlotsContainer.querySelectorAll('.target-slot');

        if (submittedWord === currentFloor.target) {
            slots.forEach(slot => slot.classList.add('state-success'));
            showMessage('CORRECT ANAGRAM!', true);

            setTimeout(() => {
                if (currentFloorIndex + 1 >= activeGameData.length) {
                    playLiftRide(LIFT_VICTORY_MS, showVictoryReceipt, { victory: true });
                } else {
                    playLiftRide(LIFT_RISE_MS, () => {
                        currentFloorIndex++;
                        loadFloor(currentFloorIndex);
                    });
                }
            }, CORRECT_FLASH_MS);
        } else {
            slots.forEach(slot => slot.classList.add('state-error'));
            showMessage('INCORRECT — DROPPED TO GROUND FLOOR', false);

            const towerFloors = document.querySelectorAll('.tower-floor');
            const activeTowerFloor = Array.from(towerFloors).find(
                f => parseInt(f.dataset.floor) === currentFloorIndex + 1
            );
            if (activeTowerFloor) activeTowerFloor.classList.add('failed');

            // v0.5: first wrong answer of the session, on any attempt
            if (firstWrongFloor === null) {
                firstWrongFloor = currentFloorIndex + 1;
            }
            recordGameResult(false, currentFloorIndex + 1, 'wrong');
            attemptsToday++;

            setTimeout(() => {
                currentFloorIndex = 0;
                rideToFirstFloor();
            }, 1500);
        }
    }

    function showVictoryReceipt() {
        stopTimer();
        recordGameResult(true, 11);

        const badgeDisplay = document.getElementById('receipt-badge-display');
        const dateDisplay = document.getElementById('receipt-date-display');
        const runSummaryDisplay = document.getElementById('victory-run-summary-display');

        if (victoryTimeDisplay) victoryTimeDisplay.textContent = formatTime(timeElapsedSeconds);
        if (dateDisplay) dateDisplay.textContent = getFormattedDateString();

        // v0.5: attempt line reads "on 1st attempt", "on 2nd attempt", ...
        if (badgeDisplay) badgeDisplay.textContent = `on ${ordinal(attemptsToday)} attempt`;

        // v0.5: Accuracy. Green 10/10 = no wrong answer all session.
        // Otherwise red = floor of the first wrong answer, green 10.
        if (runSummaryDisplay) {
            const left = firstWrongFloor === null ? '10' : String(firstWrongFloor);
            const leftColour = firstWrongFloor === null ? 'var(--state-success)' : 'var(--state-error)';
            runSummaryDisplay.innerHTML = `<span style="color: ${leftColour};">${left}</span><span style="color: var(--text-muted);">/</span><span style="color: var(--state-success);">10</span>`;
        }

        if (hudContainer) hudContainer.style.display = 'none';
        if (gameWorkspace) gameWorkspace.style.display = 'none';
        if (gameControls) gameControls.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'none';
        if (activeGameTimer) activeGameTimer.style.display = 'none';
        if (footerText) footerText.style.display = 'none';

        if (victoryScreen) victoryScreen.style.display = 'flex';
    }

    function updateTowerStack(activeFloorNum) {
        const towerFloors = document.querySelectorAll('.tower-floor');
        towerFloors.forEach(floorElem => {
            const floorVal = parseInt(floorElem.dataset.floor);
            floorElem.classList.remove('active', 'completed', 'failed');

            if (floorVal === activeFloorNum) {
                floorElem.classList.add('active');
            } else if (floorVal < activeFloorNum) {
                floorElem.classList.add('completed');
            }
        });
    }

    function showMessage(msg, isSuccess = false) {
        if (!messageBox) return;
        messageBox.textContent = msg;
        messageBox.style.color = isSuccess ? 'var(--state-success)' : 'var(--state-error)';
    }

    // v0.5: failType is 'wrong' or 'timeout' for falls, ignored for wins
    function recordGameResult(isWin, peakFloor, failType) {
        const stats = getStats();
        stats.played++;
        if (isWin) {
            stats.wins++;
            stats.streak++;
            if (stats.bestTimeSeconds === null || timeElapsedSeconds < stats.bestTimeSeconds) {
                stats.bestTimeSeconds = timeElapsedSeconds;
            }
        } else {
            stats.streak = 0;
            const key = String(peakFloor);
            if (!stats.fallsByFloor[key]) stats.fallsByFloor[key] = { wrong: 0, timeout: 0 };
            stats.fallsByFloor[key][failType === 'timeout' ? 'timeout' : 'wrong']++;
            stats.totalFalls = (stats.totalFalls || 0) + 1;
        }

        if (peakFloor > stats.bestFloor) {
            stats.bestFloor = peakFloor;
        }

        if (!debugMode) { // v0.5: debug never touches real stats
            try {
                localStorage.setItem(STATS_KEY, JSON.stringify(stats));
            } catch (e) {
                console.warn('LocalStorage save blocked.');
            }
        }
        updateStatsDisplay();
        return stats;
    }

    function defaultStats() {
        return { played: 0, wins: 0, streak: 0, bestFloor: 1, bestTimeSeconds: null, fallsByFloor: {}, totalFalls: 0 };
    }

    function getStats() {
        try {
            const raw = localStorage.getItem(STATS_KEY);
            if (!raw) return defaultStats();
            const merged = { ...defaultStats(), ...JSON.parse(raw) };
            if (!merged.fallsByFloor || typeof merged.fallsByFloor !== 'object') merged.fallsByFloor = {};
            return merged;
        } catch (e) {
            return defaultStats();
        }
    }

    function updateStatsDisplay() {
        const stats = getStats();
        const playedElem = document.getElementById('stat-played');
        const winsElem = document.getElementById('stat-wins');
        const winrateElem = document.getElementById('stat-winrate');
        const streakElem = document.getElementById('stat-streak');
        const bestfloorElem = document.getElementById('stat-bestfloor');
        const besttimeElem = document.getElementById('stat-besttime');
        const fallsElem = document.getElementById('stat-falls');

        if (playedElem) playedElem.textContent = stats.played;
        if (winsElem) winsElem.textContent = stats.wins;
        
        const winRate = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
        if (winrateElem) winrateElem.textContent = `${winRate}%`;
        if (streakElem) streakElem.textContent = `${stats.streak}`;
        
        if (bestfloorElem) {
            bestfloorElem.innerHTML = getOrdinalFloorHTML(stats.bestFloor);
        }

        if (besttimeElem) {
            besttimeElem.textContent = formatTime(stats.bestTimeSeconds);
        }

        // v0.5: falls by floor (wrong answer or timeout)
        if (fallsElem) {
            const by = stats.fallsByFloor || {};
            const floors = Object.keys(by).map(Number).sort((a, b) => a - b);
            if (floors.length === 0) {
                fallsElem.innerHTML = '';
                fallsElem.style.display = 'none';
            } else {
                fallsElem.style.display = 'block';
                fallsElem.innerHTML = '<div class="falls-title">Falls by floor</div>' + floors.map(f => {
                    const rec = by[f] || {};
                    const parts = [];
                    if (rec.wrong) parts.push(`${rec.wrong} wrong`);
                    if (rec.timeout) parts.push(`${rec.timeout} timeout`);
                    return `<div class="falls-row"><span>${ordinal(f)} Floor</span><span>${parts.join(' · ')}</span></div>`;
                }).join('');
            }
        }
    }
});
