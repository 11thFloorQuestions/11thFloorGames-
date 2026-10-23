/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - CORE GAME LOGIC (clusters.js)
 * ============================================================================
 * Sequential Clue Target Engine, 15s Stage Countdown Timer, Global Session Timer,
 * Single Mistake Game-Over Reset, 10 Playable Floors leading to 11th Floor.
 *
 * v0.5 changes (marked "v0.5"), same rules as the other games:
 *  - Session clock never stops or restarts at a fall (it starts when floor 1 first appears)
 *  - A fall drops to Ground Floor through the lift ride with no pop-up (like Cluegram)
 *  - Tower has 11 blocks
 *  - First wrong selection of the session recorded (a timeout never counts)
 *  - Every fall logged in stats (floor + wrong/timeout)
 *  - Attempt counter, receipt reads "on Nth attempt", date, Accuracy (x/10)
 *  - Flash after a correct cluster is 0.4s (was 0.6s)
 *  - Archive list loads in batches of 5 instead of 100 requests at once
 *  - "?" rules pop-up, landing screen only
 *  - Debug switches: ?debug=win, ?debug=ride, ?debug=floor&n=3 (see runDebugSwitch)
 *
 * v0.6: dated queue + manifest (clusters-manifest.json), same idea as Cluegram, Questions and Word Climb.
 *  - Game day changes at 03:00 London time, all year round (before, the UTC date was used).
 *  - Today's puzzle: the manifest's queue entry for that day. A day with no entry rotates through
 *    the manifest's "rotation" list, so the daily never freezes on one puzzle.
 *  - Before the manifest's startDate, or if the manifest is missing, the game uses clusters-data.js as before.
 *  - The Archive (Replay) list reads the manifest (the old way looked for file names that do not exist).
 *  - Start Climb now always starts today's puzzle (before, it could start the last archive played).
 * ============================================================================
 */

(function () {
    'use strict';

    let puzzleData = null;
    let hardcodedDaily = null;             // v0.6: the puzzle from clusters-data.js
    let manifestData = null;               // v0.6: the manifest, once loaded
    let queuedDaily = null;                // v0.6: today's puzzle from the queue or rotation
    let dailyReady = Promise.resolve();    // v0.6: resolves when today's puzzle has been looked up
    let startingDaily = false;             // v0.6: stops a double tap starting two climbs
    let currentFloor = 1;
    let gameState = 'intro';
    let selectedTiles = [];
    let activeTiles = [];
    let remainingGroups = [];
    let currentTargetGroup = null;

    // v0.5: attempt and accuracy tracking
    let attemptsToday = 1;
    let firstWrongFloor = null; // floor of first WRONG SELECTION (timeouts never count)
    let debugMode = false;

    // Session Stopwatch Timer State Variables
    let startTime = 0;
    let timerInterval = null;
    let timeElapsedSeconds = 0;

    // Stage Countdown Bar Timer State Variables (15 Seconds Per Stage)
    let stageTimer = null;
    let stageTimeLeft = 15;

    // Local Storage Player Stats Key
    const STATS_KEY = '11th_floor_clusters_stats';

    const CORRECT_FLASH_MS = 400; // v0.5: was 600
    const FALL_PAUSE_MS = 1500;

    const floorNumVal = document.getElementById('floor-number-val');
    const floorRuleText = document.getElementById('floor-rule-text');
    const puzzlePrompt = document.getElementById('puzzle-prompt');
    const solvedGroupsContainer = document.getElementById('solved-groups-container');
    const tileGrid = document.getElementById('tile-grid');
    const btnShuffle = document.getElementById('btn-shuffle');
    const btnSubmit = document.getElementById('btn-submit');
    const statusMessage = document.getElementById('status-message');
    const actionPanelContainer = document.getElementById('action-panel-container');
    const towerStack = document.getElementById('tower-stack');
    const btnSound = document.getElementById('btn-sound');
    const floorHudContainer = document.getElementById('floor-hud-container');
    const gameplayHeader = document.getElementById('gameplay-header');
    const startScreen = document.getElementById('start-screen');
    const mainContent = document.getElementById('game-main-content');
    const btnStartClimb = document.getElementById('btn-start-climb');
    const activeGameTimer = document.getElementById('active-game-timer');
    const timerBarWrapper = document.getElementById('timer-bar-wrapper');
    const timerBar = document.getElementById('timer-bar');
    const clueBanner = document.getElementById('clue-banner');
    const clueText = document.getElementById('clue-text');

    const victoryScreen = document.getElementById('victory-screen');
    const victoryTimeDisplay = document.getElementById('victory-time-display');
    const footerText = document.getElementById('footer-text');

    const statsModal = document.getElementById('modal-vault');
    const statsBtnLanding = document.getElementById('btn-landing-stats');
    const victoryStatsBtn = document.getElementById('btn-victory-stats');
    const closeVaultBtn = document.getElementById('btn-close-vault');
    const vaultList = document.getElementById('vault-list');
    const rulesBtn = document.getElementById('btn-rules');
    const closeRulesBtn = document.getElementById('btn-close-rules');
    const rulesModal = document.getElementById('modal-rules');

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

    // The timer bar and clue banner sit outside the puzzle area, so they are hidden
    // while the lift is showing and restored when it arrives.
    function setRideChrome(hidden) {
        const v = hidden ? 'hidden' : 'visible';
        if (timerBarWrapper) timerBarWrapper.style.visibility = v;
        if (clueBanner) clueBanner.style.visibility = v;
    }

    function rideThen(durationMs, onArrive, options) {
        setRideChrome(true);
        playLiftRide(durationMs, () => {
            setRideChrome(false);
            onArrive();
        }, options);
    }

    // ==========================================
    // HELPERS
    // ==========================================

    function triggerHaptic(pattern) {
        if ('vibrate' in navigator) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {}
        }
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

    // v0.5: same date format as the other games, e.g. "Mon 19th Oct 2026"
    function getFormattedDateString() {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const now = new Date();
        return `${days[now.getDay()]} ${ordinal(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }

    // ==========================================
    // SESSION STOPWATCH TIMER ENGINE
    // ==========================================

    function startSessionTimer() {
        stopSessionTimer();
        timeElapsedSeconds = 0;
        startTime = Date.now();
        if (activeGameTimer) {
            activeGameTimer.style.display = 'block';
            activeGameTimer.textContent = '00:00';
        }
        timerInterval = setInterval(updateSessionTimerDisplay, 1000);
    }

    function stopSessionTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null; // v0.5: so "is the clock running?" is a real question
        }
    }

    function updateSessionTimerDisplay() {
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

    // ==========================================
    // STAGE COUNTDOWN TIMER ENGINE (15s)
    // ==========================================

    function startStageTimer() {
        stopStageTimer();
        const totalDuration = 15000;
        const stageStartTime = Date.now();
        stageTimeLeft = 15;

        if (timerBarWrapper) timerBarWrapper.style.display = 'block';
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.backgroundColor = 'var(--state-active)';
        }

        stageTimer = setInterval(() => {
            const elapsed = Date.now() - stageStartTime;
            const remaining = Math.max(0, totalDuration - elapsed);
            stageTimeLeft = Math.ceil(remaining / 1000);

            if (timerBar) {
                timerBar.style.width = `${(remaining / totalDuration) * 100}%`;
                if (remaining <= totalDuration / 2) {
                    timerBar.style.backgroundColor = 'var(--state-error)';
                } else {
                    timerBar.style.backgroundColor = 'var(--state-active)';
                }
            }

            if (remaining <= 0) {
                stopStageTimer();
                handleTimeExpired();
            }
        }, 50);
    }

    function stopStageTimer() {
        if (stageTimer) {
            clearInterval(stageTimer);
            stageTimer = null;
        }
    }

    function handleTimeExpired() {
        if (gameState !== 'playing') return;
        handleFall('timeout', 'TIME EXPIRED — DROPPED TO GROUND FLOOR');
    }

    function getOrdinalFloorHTML(floorNum) {
        const ord = ordinal(floorNum);
        return `<span style="color: var(--genre-orange); font-size: 1.1rem; font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
    }

    function init() {
        if (startScreen) startScreen.style.display = 'flex';
        bindEvents();
        updateStatsDisplay();

        if (window.CLUSTERS_DATA) {
            const availableDates = Object.keys(window.CLUSTERS_DATA).sort();
            const todayStr = new Date().toISOString().split('T')[0];
            const activeDateKey = window.CLUSTERS_DATA[todayStr] ? todayStr : availableDates[availableDates.length - 1];
            puzzleData = window.CLUSTERS_DATA[activeDateKey];
            hardcodedDaily = puzzleData; // v0.6
        }
        dailyReady = resolveDailyFromQueue().catch(() => {}); // v0.6

        renderTowerStack(0);
        runDebugSwitch();
    }

    // v0.5: test shortcuts. Nothing is saved to real stats. REMOVE OR LOCK BEFORE LAUNCH.
    //   clusters.html?debug=win&attempt=3&fail=4&time=92   victory screen straight away
    //   clusters.html?debug=ride&attempt=1&time=92         the victory lift ride, then the receipt
    //   clusters.html?debug=floor&n=3                      start on floor 3 (no lift, clock running)
    // attempt = which attempt it was, fail = floor of first wrong selection (omit for clean run),
    // time = seconds, n = floor number 1 to 10.
    function runDebugSwitch() {
        let params;
        try {
            params = new URLSearchParams(window.location.search);
        } catch (e) {
            return;
        }
        const mode = params.get('debug');
        if (mode !== 'win' && mode !== 'ride' && mode !== 'floor') return;

        debugMode = true;
        const attempt = parseInt(params.get('attempt'), 10);
        const fail = parseInt(params.get('fail'), 10);
        const time = parseInt(params.get('time'), 10);
        const n = parseInt(params.get('n'), 10);

        attemptsToday = attempt > 0 ? attempt : 1;
        firstWrongFloor = fail >= 1 && fail <= 10 ? fail : null;
        timeElapsedSeconds = time >= 0 ? time : 92;

        setRulesButtonVisible(false);
        if (startScreen) startScreen.style.display = 'none';

        if (mode === 'win') {
            renderVictory();
        } else if (mode === 'ride') {
            showGameChrome();
            rideThen(LIFT_VICTORY_MS, () => renderVictory(), { victory: true });
        } else {
            showGameChrome();
            startSessionTimer();
            loadFloor(n >= 1 && n <= 10 ? n : 1);
        }
    }

    // Shows the in-game screen (HUD, clue banner, puzzle area, buttons).
    function showGameChrome() {
        if (startScreen) startScreen.style.display = 'none';
        if (victoryScreen) victoryScreen.style.display = 'none';
        if (floorHudContainer) floorHudContainer.style.display = 'flex';
        if (gameplayHeader) gameplayHeader.style.display = 'flex';
        if (timerBarWrapper) timerBarWrapper.style.display = 'block';
        if (clueBanner) clueBanner.style.display = 'block';
        if (mainContent) mainContent.style.display = 'flex';
        if (actionPanelContainer) actionPanelContainer.style.display = 'flex';
        if (footerText) footerText.style.display = 'block';
        setRulesButtonVisible(false);
    }

    function setRulesButtonVisible(visible) {
        if (rulesBtn) rulesBtn.style.display = visible ? '' : 'none';
    }

    function bindEvents() {
        if (btnShuffle) {
            btnShuffle.addEventListener('pointerdown', () => triggerHaptic(15));
            btnShuffle.addEventListener('click', shuffleActiveTiles);
        }

        if (btnSubmit) {
            btnSubmit.addEventListener('pointerdown', () => triggerHaptic(15));
            btnSubmit.addEventListener('click', handleSubmission);
        }

        if (btnStartClimb) {
            btnStartClimb.addEventListener('pointerdown', () => triggerHaptic(15));
            btnStartClimb.addEventListener('click', startDaily); // v0.6: was startClimb
        }

        if (btnSound) {
            btnSound.addEventListener('pointerdown', () => triggerHaptic(15));
            btnSound.addEventListener('click', () => {
                btnSound.textContent = btnSound.textContent.includes('OFF') ? 'SOUND: ON' : 'SOUND: OFF';
            });
        }

        if (statsBtnLanding) {
            statsBtnLanding.addEventListener('pointerdown', () => triggerHaptic(15));
            statsBtnLanding.addEventListener('click', () => {
                updateStatsDisplay();
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }

        if (victoryStatsBtn) {
            victoryStatsBtn.addEventListener('pointerdown', () => triggerHaptic(15));
            victoryStatsBtn.addEventListener('click', () => {
                updateStatsDisplay();
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }

        if (closeVaultBtn) {
            closeVaultBtn.addEventListener('pointerdown', () => triggerHaptic(15));
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
    }

    function resetToStartScreen() {
        stopSessionTimer();
        stopStageTimer();
        if (victoryScreen) victoryScreen.style.display = 'none';
        if (floorHudContainer) floorHudContainer.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (actionPanelContainer) actionPanelContainer.style.display = 'none';
        if (timerBarWrapper) timerBarWrapper.style.display = 'none';
        if (clueBanner) clueBanner.style.display = 'none';
        if (activeGameTimer) activeGameTimer.style.display = 'none';
        if (statusMessage) statusMessage.textContent = '';
        if (startScreen) startScreen.style.display = 'flex';
        setRulesButtonVisible(true); // v0.5
    }

    // v0.5: 11 blocks, floor 11 is the top block and is never active during play.
    // The stack is drawn bottom-to-top, so block 1 is the 1st floor.
    function renderTowerStack(activeFloor, failedFloor) {
        if (!towerStack) return;
        towerStack.innerHTML = '';
        for (let i = 1; i <= 11; i++) {
            const floorBar = document.createElement('div');
            floorBar.className = 'tower-floor';
            floorBar.dataset.floor = i;
            if (failedFloor && i === failedFloor) {
                floorBar.classList.add('failed');
            } else if (i === activeFloor) {
                floorBar.classList.add('active');
            } else if (i < activeFloor) {
                floorBar.classList.add('completed');
            }
            towerStack.appendChild(floorBar);
        }
    }

    // Fresh climb from the landing screen or an archive. Resets the session.
    function startClimb() {
        if (!puzzleData && window.CLUSTERS_DATA) {
            const availableDates = Object.keys(window.CLUSTERS_DATA).sort();
            const todayStr = new Date().toISOString().split('T')[0];
            const activeDateKey = window.CLUSTERS_DATA[todayStr] ? todayStr : availableDates[availableDates.length - 1];
            puzzleData = window.CLUSTERS_DATA[activeDateKey];
        }

        if (!puzzleData) {
            if (statusMessage) statusMessage.textContent = "ERROR: CLUSTERS DATA NOT LOADED.";
            return;
        }

        // v0.5: a new climb is a new session
        stopSessionTimer();
        stopStageTimer();
        attemptsToday = 1;
        firstWrongFloor = null;

        showGameChrome();

        rideToFloorOne();
    }

    // Lobby to the 1st floor: the opening ride, and the ride back after every fall.
    // The session clock starts when floor 1 first appears and then keeps running.
    function rideToFloorOne() {
        gameState = 'animating';
        currentFloor = 1;
        selectedTiles = [];
        if (statusMessage) statusMessage.textContent = '';
        if (floorNumVal) floorNumVal.innerHTML = getOrdinalFloorHTML(1);
        renderTowerStack(1);

        const rideMs = liftFirstRideDone ? LIFT_RISE_MS : LIFT_OPENING_MS;
        liftFirstRideDone = true;
        rideThen(rideMs, () => {
            if (!timerInterval) startSessionTimer();
            loadFloor(1);
        });
    }

    function loadFloor(floorNum) {
        currentFloor = floorNum;
        gameState = 'playing';
        if (floorNumVal) {
            floorNumVal.innerHTML = getOrdinalFloorHTML(currentFloor);
        }
        if (floorRuleText) {
            floorRuleText.textContent = "No mistakes!";
        }
        renderTowerStack(currentFloor);
        selectedTiles = [];
        if (solvedGroupsContainer) solvedGroupsContainer.innerHTML = '';
        if (statusMessage) statusMessage.textContent = '';
        if (btnSubmit) btnSubmit.disabled = true;

        const floorConfig = puzzleData.floors[currentFloor];
        if (!floorConfig) {
            renderVictory();
            return;
        }

        activeTiles = [...floorConfig.tiles];
        remainingGroups = floorConfig.groups.map(g => ({ ...g }));

        if (puzzlePrompt) {
            if (currentFloor === 10) {
                puzzlePrompt.textContent = "Select 4 tiles matching the active target cluster.";
            } else {
                puzzlePrompt.textContent = "Select 3 tiles matching the active target cluster.";
            }
        }

        shuffleArray(activeTiles);
        setupNextStageClue();
        renderGrid();
    }

    function setupNextStageClue() {
        if (remainingGroups.length > 0) {
            currentTargetGroup = remainingGroups[0];
            if (clueText) {
                clueText.textContent = currentTargetGroup.clue || currentTargetGroup.category;
            }
            startStageTimer();
        }
    }

    function renderGrid() {
        if (!tileGrid) return;
        tileGrid.innerHTML = '';

        if (currentFloor === 10) {
            tileGrid.className = 'tile-grid grid-col-4';
        } else {
            tileGrid.className = 'tile-grid grid-col-3';
        }

        activeTiles.forEach(tileText => {
            const tileEl = document.createElement('div');
            tileEl.className = 'cluster-tile';
            if (selectedTiles.includes(tileText)) {
                tileEl.classList.add('selected');
            }
            tileEl.textContent = tileText;

            tileEl.addEventListener('pointerdown', () => triggerHaptic(15));
            tileEl.addEventListener('click', () => handleTileClick(tileText, tileEl));
            tileGrid.appendChild(tileEl);
        });
    }

    function handleTileClick(tileText, tileEl) {
        if (gameState !== 'playing') return;

        const maxSelection = (currentFloor === 10) ? 4 : 3;

        const index = selectedTiles.indexOf(tileText);
        if (index > -1) {
            selectedTiles.splice(index, 1);
            tileEl.classList.remove('selected');
        } else {
            if (selectedTiles.length < maxSelection) {
                selectedTiles.push(tileText);
                tileEl.classList.add('selected');
            }
        }

        if (btnSubmit) btnSubmit.disabled = (selectedTiles.length !== maxSelection);
    }

    function shuffleActiveTiles() {
        if (gameState !== 'playing') return;
        shuffleArray(activeTiles);
        renderGrid();
    }

    function handleSubmission() {
        if (gameState !== 'playing' || !currentTargetGroup) return;

        const maxSelection = (currentFloor === 10) ? 4 : 3;
        if (selectedTiles.length !== maxSelection) return;

        stopStageTimer();

        const groupWords = currentTargetGroup.words;
        const isMatch = selectedTiles.every(t => groupWords.includes(t)) && groupWords.every(t => selectedTiles.includes(t));

        if (isMatch) {
            gameState = 'animating';
            if (btnSubmit) btnSubmit.disabled = true;

            triggerHaptic([35, 40, 35]);

            const tileElements = tileGrid.querySelectorAll('.cluster-tile');
            tileElements.forEach(el => {
                if (selectedTiles.includes(el.textContent)) {
                    el.classList.remove('selected');
                    el.classList.add('success');
                }
            });

            if (statusMessage) statusMessage.textContent = "CORRECT CLUSTER.";

            setTimeout(() => {
                const solvedGroup = remainingGroups.shift();
                solvedGroup.words.forEach(word => {
                    const idx = activeTiles.indexOf(word);
                    if (idx > -1) activeTiles.splice(idx, 1);
                });

                appendSolvedCard(solvedGroup);
                selectedTiles = [];
                gameState = 'playing';

                if (remainingGroups.length === 0) {
                    if (currentFloor < 10) {
                        if (statusMessage) statusMessage.textContent = `${ordinal(currentFloor).toUpperCase()} FLOOR CLEARED. ADVANCING...`;
                        gameState = 'animating';
                        setTimeout(() => {
                            rideThen(LIFT_RISE_MS, () => loadFloor(currentFloor + 1));
                        }, 900);
                    } else {
                        gameState = 'animating';
                        rideThen(LIFT_VICTORY_MS, () => {
                            stopSessionTimer();
                            recordGameResult(true, 11);
                            renderVictory();
                        }, { victory: true });
                    }
                } else {
                    setupNextStageClue();
                    renderGrid();
                }
            }, CORRECT_FLASH_MS);

        } else {
            // v0.5: first wrong selection of the session, on any attempt
            if (firstWrongFloor === null) {
                firstWrongFloor = currentFloor;
            }
            handleFall('wrong', 'INCORRECT — DROPPED TO GROUND FLOOR');
        }
    }

    // v0.5: a fall. No pop-up: show the message, mark the floor red, then ride back to the
    // 1st floor. The session clock keeps running. type is 'wrong' or 'timeout'.
    function handleFall(type, message) {
        stopStageTimer();
        gameState = 'penalty';
        triggerHaptic([80, 50, 120]);
        if (btnSubmit) btnSubmit.disabled = true;

        renderTowerStack(0, currentFloor);
        if (statusMessage) statusMessage.textContent = message;

        recordGameResult(false, currentFloor, type);
        attemptsToday++;

        setTimeout(() => {
            rideToFloorOne();
        }, FALL_PAUSE_MS);
    }

    function appendSolvedCard(group) {
        if (!solvedGroupsContainer) return;
        const card = document.createElement('div');
        card.className = 'solved-group-card';
        card.innerHTML = `
            <div class="solved-group-category">${group.category}</div>
            <div class="solved-group-words">${group.words.join(' // ')}</div>
        `;
        solvedGroupsContainer.appendChild(card);
    }

    function renderVictory() {
        stopSessionTimer();
        stopStageTimer();
        gameState = 'victory';

        if (floorHudContainer) floorHudContainer.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'none';
        if (timerBarWrapper) timerBarWrapper.style.display = 'none';
        if (clueBanner) clueBanner.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (actionPanelContainer) actionPanelContainer.style.display = 'none';
        if (activeGameTimer) activeGameTimer.style.display = 'none';
        if (footerText) footerText.style.display = 'none';
        if (statusMessage) statusMessage.textContent = '';

        triggerHaptic([50, 50, 50, 50, 100]);

        const badgeDisplay = document.getElementById('receipt-badge-display');
        const dateDisplay = document.getElementById('receipt-date-display');
        const runSummaryDisplay = document.getElementById('victory-run-summary-display');

        if (victoryTimeDisplay) victoryTimeDisplay.textContent = formatTime(timeElapsedSeconds);
        if (dateDisplay) dateDisplay.textContent = getFormattedDateString();

        // v0.5: attempt line reads "on 1st attempt", "on 2nd attempt", ...
        if (badgeDisplay) badgeDisplay.textContent = `on ${ordinal(attemptsToday)} attempt`;

        // v0.5: Accuracy. Green 10/10 = no wrong selection all session.
        // Otherwise red = floor of the first wrong selection, green 10.
        if (runSummaryDisplay) {
            const left = firstWrongFloor === null ? '10' : String(firstWrongFloor);
            const leftColour = firstWrongFloor === null ? 'var(--state-success)' : 'var(--state-error)';
            runSummaryDisplay.innerHTML = `<span style="color: ${leftColour};">${left}</span><span style="color: var(--text-muted);">/</span><span style="color: var(--state-success);">10</span>`;
        }

        if (victoryScreen) victoryScreen.style.display = 'flex';
    }

    // ==========================================
    // v0.6: QUEUE + MANIFEST
    // clusters-manifest.json holds: startDate (before it the game keeps using clusters-data.js),
    // queue (a puzzle for a given date), rotation (puzzles used on any date with no queue entry),
    // and replay (the shelf). The game day changes at 03:00 London time.
    // ==========================================
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

    function fetchManifest() {
        return fetch('./clusters-manifest.json', { cache: 'no-cache' })
            .then(res => (res.ok ? res.json() : null))
            .catch(() => null);
    }

    // Replay list: the shelf, then every queued puzzle whose day has passed (oldest first)
    function getReplayList(m) {
        const key = getGameDayKey();
        const queue = Array.isArray(m.queue) ? m.queue : [];
        const played = queue.filter(q => q.date < key)
            .sort((a, b) => (a.date < b.date ? -1 : 1)).map(q => q.set);
        const seen = {};
        return [...(m.replay || []), ...played].filter(n => (seen[n] ? false : (seen[n] = true)));
    }

    async function resolveDailyFromQueue() {
        const m = await fetchManifest();
        if (!m) return;
        manifestData = m;

        const key = getGameDayKey();
        if (m.startDate && key < m.startDate) return; // before the start: keep clusters-data.js

        const queue = Array.isArray(m.queue) ? m.queue : [];
        const rotation = Array.isArray(m.rotation) ? m.rotation : [];
        let slot = null;
        const hit = queue.find(q => q.date === key);
        if (hit) {
            slot = hit.set;
        } else if (rotation.length > 0) {
            // No puzzle queued for today: rotate through the stand-by list
            const dayNumber = Math.floor(Date.parse(key + 'T00:00:00Z') / 86400000);
            slot = rotation[dayNumber % rotation.length];
        }
        if (slot === null) return;

        const data = await fetchFileWithFallbacks(`sandbox-clusters.${pad2(slot)}.json`);
        if (data && data.floors && Object.keys(data.floors).length > 0) {
            queuedDaily = data;
        }
    }

    // Start Climb on the landing screen: always today's puzzle, never a leftover archive puzzle
    async function startDaily() {
        if (startingDaily) return;
        startingDaily = true;
        try {
            await dailyReady;
            if (queuedDaily) puzzleData = queuedDaily;
            else if (hardcodedDaily) puzzleData = hardcodedDaily;
            startClimb();
        } finally {
            startingDaily = false;
        }
    }

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

        // v0.6: use the manifest's replay list when there is one
        await dailyReady;
        if (manifestData) {
            const slots = getReplayList(manifestData);
            vaultList.innerHTML = '';
            if (slots.length === 0) {
                vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">No archives found.</div>';
            } else {
                slots.forEach(n => {
                    const id = pad2(n);
                    const btn = document.createElement('button');
                    btn.className = 'vault-item-btn';
                    btn.innerHTML = `<strong>Archive ${id}</strong>`;
                    btn.onpointerdown = () => triggerHaptic(15);
                    btn.onclick = async () => {
                        const data = await fetchFileWithFallbacks(`sandbox-clusters.${id}.json`);
                        if (data && data.floors) {
                            loadVaultArchive(id, data);
                        } else {
                            alert(`Could not load Archive ${id}.`);
                        }
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
                const paddedId = String(currentId + i).padStart(2, '0');
                batchPromises.push(
                    fetchFileWithFallbacks(`clusters-${paddedId}.json`).then(data => ({ id: paddedId, data }))
                );
            }

            const batchResults = await Promise.all(batchPromises);
            let missingFound = false;

            batchResults.forEach(({ id, data }) => {
                if (data) {
                    const btn = document.createElement('button');
                    btn.className = 'vault-item-btn';
                    btn.innerHTML = `<strong>Archive ${id}</strong>`;
                    btn.onpointerdown = () => triggerHaptic(15);
                    btn.onclick = () => loadVaultArchive(id, data);
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

    function loadVaultArchive(paddedId, data) {
        if (data) {
            puzzleData = data;
            if (statsModal) statsModal.classList.add('hidden');
            startClimb();
        }
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
                console.warn("LocalStorage save blocked.");
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
        if (streakElem) streakElem.textContent = stats.streak;

        if (bestfloorElem) {
            bestfloorElem.innerHTML = getOrdinalFloorHTML(stats.bestFloor);
        }

        if (besttimeElem) {
            besttimeElem.textContent = formatTime(stats.bestTimeSeconds);
        }

        // v0.5: falls by floor (wrong selection or timeout)
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

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    window.addEventListener('DOMContentLoaded', init);

})();
