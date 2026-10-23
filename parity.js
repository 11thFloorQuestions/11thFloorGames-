// ==========================================================================
// 11th Floor Parity — Core Engine & Matching Rules (Fail-Safe Hardened)
//
// v0.5 changes (marked "v0.5"), same shape as the other games:
//  - Lift rides: opening ride, rise between floors, victory ride, ride back after a fall
//  - Session clock starts when floor 1 first appears and never stops or restarts at a fall
//  - Accuracy for Parity: the ONLY way to fall is running out of time, so the red number
//    is the floor of the first timeout. Mismatched pairs never count.
//  - Every fall logged in stats (floor + timeout)
//  - Attempt counter, receipt reads "on Nth attempt", date, Accuracy (x/10)
//  - Time shown as m:ss (no leading zero, no "s")
//  - Falls say "Ground Floor"
//  - Archive list loads in batches of 5 instead of 50 requests at once
//  - "?" rules pop-up, landing screen only
//  - Debug switches: ?debug=win, ?debug=ride, ?debug=floor&n=3 (see runDebugSwitch)
// v0.5.1: Archive buttons now start a set on a tap (finger lifted), not the instant a finger
//  touches the screen, so the list can be scrolled without starting a set.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    let currentFloorIndex = 0;
    let selectedTiles = [];
    let matchedPairsCount = 0;
    let isProcessing = false;
    let soundEnabled = true;
    let activeDataSet = null;
    let activeGameData = [];
    let timerInterval = null;
    let timeRemaining = 0;
    let totalFloorTime = 0;

    // v0.5: attempt and accuracy tracking
    let attemptsToday = 1;
    let firstTimeoutFloor = null; // floor of the first time-out this session (Parity's only fall)
    let debugMode = false;

    // Overall Active Match Timer
    let gameStartTime = 0;
    let activeGameTimerInterval = null;
    let totalElapsedSeconds = 0;

    const STATS_KEY = '11th_floor_parity_stats';
    const CORRECT_FLASH_MS = 400; // v0.5: was 800
    const FALL_PAUSE_MS = 1500;

    const DEFAULT_SVG_MAP = {
        'star': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        'heart': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        'diamond': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg>',
        'square': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3z"/></svg>',
        'circle': '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>'
    };

    const FALLBACK_FLOORS = [
        { pairs: 1, timeLimit: 12, icons: ['star'] },
        { pairs: 2, timeLimit: 15, icons: ['star', 'heart'] },
        { pairs: 3, timeLimit: 18, icons: ['star', 'heart', 'diamond'] },
        { pairs: 4, timeLimit: 20, icons: ['star', 'heart', 'diamond', 'square'] },
        { pairs: 5, timeLimit: 22, icons: ['star', 'heart', 'diamond', 'square', 'circle'] },
        { pairs: 6, timeLimit: 25, icons: ['star', 'heart', 'diamond', 'square', 'circle', 'star'] },
        { pairs: 7, timeLimit: 28, icons: ['star', 'heart', 'diamond', 'square', 'circle', 'star', 'heart'] },
        { pairs: 8, timeLimit: 30, icons: ['star', 'heart', 'diamond', 'square', 'circle', 'star', 'heart', 'diamond'] },
        { pairs: 9, timeLimit: 32, icons: ['star', 'heart', 'diamond', 'square', 'circle', 'star', 'heart', 'diamond', 'square'] },
        { pairs: 10, timeLimit: 35, icons: ['star', 'heart', 'diamond', 'square', 'circle', 'star', 'heart', 'diamond', 'square', 'circle'] }
    ];

    const startScreen = document.getElementById('start-screen');
    const startClimbBtn = document.getElementById('start-climb-btn');
    const gameplayHeader = document.getElementById('gameplay-header');
    const hudContainer = document.getElementById('floor-hud-container');
    const gameWorkspace = document.getElementById('game-workspace');
    const victoryScreen = document.getElementById('victory-screen');

    const activeGameTimer = document.getElementById('active-game-timer');
    const victoryTimeDisplay = document.getElementById('victory-time-display');
    const footerText = document.getElementById('footer-text');

    const floorNumberVal = document.getElementById('floor-number-val');
    const floorRuleText = document.getElementById('floor-rule-text');
    const parityGrid = document.getElementById('parity-grid');
    const messageBox = document.getElementById('message-box');
    const timerBarFill = document.getElementById('timer-bar-fill');

    const statsModal = document.getElementById('modal-vault');
    const statsBtn = document.getElementById('btn-landing-stats');
    const victoryStatsBtn = document.getElementById('btn-victory-stats');
    const closeVaultBtn = document.getElementById('btn-close-vault');
    const soundBtn = document.getElementById('btn-sound');
    const vaultList = document.getElementById('vault-list');
    const rulesBtn = document.getElementById('btn-rules');
    const closeRulesBtn = document.getElementById('btn-close-rules');
    const rulesModal = document.getElementById('modal-rules');

    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];

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

    init();

    function triggerHaptic() {
        if ('vibrate' in navigator) {
            try {
                navigator.vibrate([10, 30, 10]);
            } catch(e) {}
        }
    }

    function bindInteraction(element, handler) {
        if (!element) return;
        let handled = false;

        element.addEventListener('pointerdown', (e) => {
            handled = true;
            triggerHaptic();
            handler(e);
        });

        element.addEventListener('click', (e) => {
            if (handled) {
                handled = false;
                e.preventDefault();
                return;
            }
            triggerHaptic();
            handler(e);
        });
    }

    function init() {
        try {
            activeDataSet = window.PARITY_DAILY_SET || null;
            activeGameData = (activeDataSet && Array.isArray(activeDataSet.floors)) ? activeDataSet.floors : FALLBACK_FLOORS;
        } catch (e) {
            activeGameData = FALLBACK_FLOORS;
        }
        bindEvents();
        updateStatsDisplay();
        runDebugSwitch();
    }

    // v0.5: test shortcuts. Nothing is saved to real stats. REMOVE OR LOCK BEFORE LAUNCH.
    //   parity.html?debug=win&attempt=3&fail=4&time=92   victory screen straight away
    //   parity.html?debug=ride&attempt=1&time=92         the victory lift ride, then the receipt
    //   parity.html?debug=floor&n=10                     start on floor 10 (no lift, clock running)
    // attempt = which attempt it was, fail = floor of first time-out (omit for clean run),
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
        firstTimeoutFloor = fail >= 1 && fail <= 10 ? fail : null;
        totalElapsedSeconds = time >= 0 ? time : 92;

        setRulesButtonVisible(false);

        if (mode === 'win') {
            if (startScreen) startScreen.style.display = 'none';
            showReceipt();
        } else if (mode === 'ride') {
            showGameChrome();
            playLiftRide(LIFT_VICTORY_MS, () => showReceipt(), { victory: true });
        } else {
            showGameChrome();
            startMatchTimer();
            currentFloorIndex = (n >= 1 && n <= 10 ? n : 1) - 1;
            loadFloor(currentFloorIndex);
        }
    }

    function setRulesButtonVisible(visible) {
        if (rulesBtn) rulesBtn.style.display = visible ? '' : 'none';
    }

    // Shows the in-game screen (header, HUD, play card, footer).
    function showGameChrome() {
        if (startScreen) startScreen.style.display = 'none';
        if (victoryScreen) victoryScreen.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'flex';
        if (hudContainer) hudContainer.style.display = 'flex';
        if (gameWorkspace) gameWorkspace.style.display = 'flex';
        if (footerText) footerText.style.display = 'block';
        setRulesButtonVisible(false);
    }

    function bindEvents() {
        if (startClimbBtn) bindInteraction(startClimbBtn, startGame);

        if (statsBtn) {
            bindInteraction(statsBtn, () => {
                updateStatsDisplay();
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }

        if (victoryStatsBtn) {
            bindInteraction(victoryStatsBtn, () => {
                updateStatsDisplay();
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }

        if (closeVaultBtn) {
            bindInteraction(closeVaultBtn, () => {
                if (statsModal) statsModal.classList.add('hidden');
                if (victoryScreen && victoryScreen.style.display !== 'none') {
                    resetToStartScreen();
                }
            });
        }

        // v0.5: rules pop-up
        if (rulesBtn) bindInteraction(rulesBtn, () => { if (rulesModal) rulesModal.classList.remove('hidden'); });
        if (closeRulesBtn) bindInteraction(closeRulesBtn, () => { if (rulesModal) rulesModal.classList.add('hidden'); });

        if (soundBtn) {
            bindInteraction(soundBtn, () => {
                soundEnabled = !soundEnabled;
                soundBtn.textContent = `SOUND: ${soundEnabled ? 'ON' : 'OFF'}`;
            });
        }
    }

    function startMatchTimer() {
        stopMatchTimer();
        totalElapsedSeconds = 0;
        gameStartTime = Date.now();
        if (activeGameTimer) {
            activeGameTimer.style.display = 'block';
            activeGameTimer.textContent = '0:00';
        }
        activeGameTimerInterval = setInterval(updateMatchTimerDisplay, 1000);
    }

    function stopMatchTimer() {
        if (activeGameTimerInterval) {
            clearInterval(activeGameTimerInterval);
            activeGameTimerInterval = null; // v0.5: so "is the clock running?" is a real question
        }
    }

    function updateMatchTimerDisplay() {
        totalElapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
        if (activeGameTimer) {
            activeGameTimer.textContent = formatTime(totalElapsedSeconds);
        }
    }

    // v0.5: m:ss, no leading zero on the minutes (for example 1:32)
    function formatTime(totalSeconds) {
        if (totalSeconds === null || totalSeconds === undefined) return "--:--";
        const m = Math.floor(totalSeconds / 60);
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    async function fetchFileWithFallbacks(filename) {
        const candidatePaths = [
            `./archives/${filename}`,
            `archives/${filename}`,
            `./${filename}`,
            `${filename}`,
            `./assets/data/floors/${filename}`,
            `./data/${filename}`
        ];

        for (const path of candidatePaths) {
            try {
                const res = await fetch(path);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.floors) return data;
                }
            } catch (e) {}
        }
        return null;
    }

    // v0.5: batches of 5, stops at the first batch with a missing file
    async function populateVault() {
        if (!vaultList) return;
        vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">Loading Archives...</div>';

        const BATCH_SIZE = 5;
        const MAX_ARCHIVES = 50;
        const buttons = [];
        let currentId = 1;

        while (currentId <= MAX_ARCHIVES) {
            const batchPromises = [];
            for (let i = 0; i < BATCH_SIZE && (currentId + i) <= MAX_ARCHIVES; i++) {
                const paddedId = String(currentId + i).padStart(2, '0');
                batchPromises.push(
                    fetchFileWithFallbacks(`sandbox-parity.${paddedId}.json`)
                        .then(data => ({ id: paddedId, data }))
                );
            }

            const batchResults = await Promise.all(batchPromises);
            let missingFound = false;

            batchResults.forEach(({ id, data }) => {
                if (data && data.floors) {
                    const btn = document.createElement('button');
                    btn.className = 'vault-item-btn';
                    btn.innerHTML = `<strong>Archive ${id}</strong>`;
                    btn.addEventListener('click', () => { triggerHaptic(); loadVaultSet(data); }); // v0.5.1
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

    function loadVaultSet(data) {
        if (data && data.floors) {
            activeDataSet = data;
            activeGameData = data.floors;
            if (statsModal) statsModal.classList.add('hidden');
            startGame();
        }
    }

    // Fresh climb from the landing screen or an archive. Resets the session.
    function startGame() {
        if (!activeGameData || activeGameData.length === 0) {
            activeDataSet = window.PARITY_DAILY_SET || null;
            activeGameData = (activeDataSet && activeDataSet.floors) ? activeDataSet.floors : FALLBACK_FLOORS;
        }

        // v0.5: a new climb is a new session
        stopMatchTimer();
        clearInterval(timerInterval);
        attemptsToday = 1;
        firstTimeoutFloor = null;

        showGameChrome();
        rideToFloorOne();
    }

    // Lobby to the 1st floor: the opening ride, and the ride back after every fall.
    // The session clock starts when floor 1 first appears and then keeps running.
    function rideToFloorOne() {
        isProcessing = true;
        currentFloorIndex = 0;
        showMessage('');
        if (floorNumberVal) floorNumberVal.innerHTML = getOrdinalFloorHTML(1);
        updateTowerStack(1);

        const rideMs = liftFirstRideDone ? LIFT_RISE_MS : LIFT_OPENING_MS;
        liftFirstRideDone = true;
        playLiftRide(rideMs, () => {
            if (!activeGameTimerInterval) startMatchTimer();
            loadFloor(0);
        });
    }

    function resetToStartScreen() {
        stopMatchTimer();
        clearInterval(timerInterval);
        if (victoryScreen) victoryScreen.style.display = 'none';
        if (hudContainer) hudContainer.style.display = 'none';
        if (gameWorkspace) gameWorkspace.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'none';
        if (activeGameTimer) activeGameTimer.style.display = 'none';
        if (startScreen) startScreen.style.display = 'flex';
        setRulesButtonVisible(true);
    }

    function getOrdinalFloorHTML(floorNum) {
        const ord = ordinals[floorNum - 1] || `${floorNum}th`;
        return `<span style="color: var(--genre-pink); font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
    }

    function loadFloor(index) {
        if (!activeGameData || index >= activeGameData.length) return;

        clearInterval(timerInterval);
        currentFloorIndex = index;
        const floorData = activeGameData[index];
        selectedTiles = [];
        matchedPairsCount = 0;
        isProcessing = false;
        showMessage('');

        if (floorNumberVal) floorNumberVal.innerHTML = getOrdinalFloorHTML(index + 1);

        if (floorRuleText) {
            if (index === 0) {
                floorRuleText.textContent = `1 PAIR • TAP ANY TILE TO REVEAL`;
            } else {
                floorRuleText.textContent = `${floorData.pairs} Pair${floorData.pairs > 1 ? 's' : ''} • Clear Grid Before Time Expires!`;
            }
        }

        updateTowerStack(index + 1);
        buildGrid(floorData, index === 0);
        startTimer(floorData.timeLimit);
    }

    function buildGrid(floorData, isFirstFloor) {
        if (!parityGrid) return;
        parityGrid.innerHTML = '';
        const icons = floorData.icons.slice(0, floorData.pairs);
        const deck = [...icons, ...icons];

        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        const count = deck.length;
        if (count <= 4) {
            parityGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            parityGrid.style.gap = '8px';
        } else if (count <= 12) {
            parityGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            parityGrid.style.gap = '6px';
        } else if (count <= 16) {
            parityGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            parityGrid.style.gap = '5px';
        } else {
            parityGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
            parityGrid.style.gap = '4px';
        }

        const svgMap = (activeDataSet && activeDataSet.svgMap) 
            ? activeDataSet.svgMap 
            : DEFAULT_SVG_MAP;

        deck.forEach((iconKey, index) => {
            const tile = document.createElement('div');
            tile.className = 'parity-tile face-down';

            if (isFirstFloor && index === 0) {
                tile.classList.add('pulse-hint');
            }

            tile.dataset.icon = iconKey;
            tile.dataset.index = index;
            tile.innerHTML = svgMap[iconKey] || DEFAULT_SVG_MAP.star;
            bindInteraction(tile, () => handleTileClick(tile));
            parityGrid.appendChild(tile);
        });
    }

    function startTimer(seconds) {
        timeRemaining = seconds;
        totalFloorTime = seconds;
        updateTimerBar();

        timerInterval = setInterval(() => {
            timeRemaining -= 0.1;
            updateTimerBar();

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                handleFloorFailure('TIME EXPIRED — DROPPED TO GROUND FLOOR');
            }
        }, 100);
    }

    function updateTimerBar() {
        if (!timerBarFill) return;
        const pct = Math.max(0, (timeRemaining / totalFloorTime) * 100);
        timerBarFill.style.width = `${pct}%`;

        if (pct <= 50) {
            timerBarFill.style.backgroundColor = 'var(--state-error)';
            timerBarFill.style.boxShadow = '0 0 10px var(--state-error-glow)';
        } else {
            timerBarFill.style.backgroundColor = 'var(--state-active)';
            timerBarFill.style.boxShadow = '0 0 8px var(--state-active-glow)';
        }
    }

    function handleTileClick(tile) {
        if (isProcessing || tile.classList.contains('matched') || tile.classList.contains('selected') || selectedTiles.length >= 2) {
            return;
        }

        document.querySelectorAll('.parity-tile.pulse-hint').forEach(t => t.classList.remove('pulse-hint'));

        tile.classList.remove('face-down');
        tile.classList.add('selected');
        selectedTiles.push(tile);

        if (selectedTiles.length === 2) {
            isProcessing = true;
            checkMatch();
        }
    }

    function checkMatch() {
        const [tile1, tile2] = selectedTiles;

        if (tile1.dataset.icon === tile2.dataset.icon) {
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
            tile1.classList.add('matched');
            tile2.classList.add('matched');

            matchedPairsCount++;
            selectedTiles = [];
            isProcessing = false;

            const floorData = activeGameData[currentFloorIndex];
            if (matchedPairsCount === floorData.pairs) {
                clearInterval(timerInterval);
                isProcessing = true;
                showMessage('PARITY MATCHED!', true);

                setTimeout(() => {
                    if (currentFloorIndex + 1 >= activeGameData.length) {
                        playLiftRide(LIFT_VICTORY_MS, () => {
                            stopMatchTimer();
                            recordGameResult(true, 11);
                            showReceipt();
                        }, { victory: true });
                    } else {
                        playLiftRide(LIFT_RISE_MS, () => {
                            currentFloorIndex++;
                            loadFloor(currentFloorIndex);
                        });
                    }
                }, CORRECT_FLASH_MS);
            }
        } else {
            // A mismatch is a normal part of the game: it flips back and costs time only.
            tile1.classList.add('error');
            tile2.classList.add('error');

            setTimeout(() => {
                tile1.classList.remove('selected', 'error');
                tile2.classList.remove('selected', 'error');
                tile1.classList.add('face-down');
                tile2.classList.add('face-down');

                selectedTiles = [];
                isProcessing = false;
            }, 600);
        }
    }

    // v0.5: the only way to fall in Parity is the floor timer. No pop-up: show the message,
    // mark the floor red, then ride back to the 1st floor. The session clock keeps running.
    function handleFloorFailure(reason) {
        isProcessing = true;
        showMessage(reason, false);

        const towerFloors = document.querySelectorAll('.tower-floor');
        const activeTowerFloor = Array.from(towerFloors).find(
            f => parseInt(f.dataset.floor) === currentFloorIndex + 1
        );
        if (activeTowerFloor) activeTowerFloor.classList.add('failed');

        if (firstTimeoutFloor === null) {
            firstTimeoutFloor = currentFloorIndex + 1;
        }
        recordGameResult(false, currentFloorIndex + 1, 'timeout');
        attemptsToday++;

        setTimeout(() => {
            rideToFloorOne();
        }, FALL_PAUSE_MS);
    }

    function showReceipt() {
        stopMatchTimer();

        const badgeDisplay = document.getElementById('receipt-badge-display');
        const dateDisplay = document.getElementById('receipt-date-display');
        const runSummaryDisplay = document.getElementById('victory-run-summary-display');

        if (victoryTimeDisplay) victoryTimeDisplay.textContent = formatTime(totalElapsedSeconds);
        if (dateDisplay) dateDisplay.textContent = getFormattedDateString();

        // v0.5: attempt line reads "on 1st attempt", "on 2nd attempt", ...
        if (badgeDisplay) badgeDisplay.textContent = `on ${ordinal(attemptsToday)} attempt`;

        // v0.5: Accuracy. Green 10/10 = never ran out of time all session.
        // Otherwise red = floor of the first time-out, green 10.
        if (runSummaryDisplay) {
            const left = firstTimeoutFloor === null ? '10' : String(firstTimeoutFloor);
            const leftColour = firstTimeoutFloor === null ? 'var(--state-success)' : 'var(--state-error)';
            runSummaryDisplay.innerHTML = `<span style="color: ${leftColour};">${left}</span><span style="color: var(--text-muted);">/</span><span style="color: var(--state-success);">10</span>`;
        }

        if (hudContainer) hudContainer.style.display = 'none';
        if (gameWorkspace) gameWorkspace.style.display = 'none';
        if (gameplayHeader) gameplayHeader.style.display = 'none';
        if (activeGameTimer) activeGameTimer.style.display = 'none';
        if (footerText) footerText.style.display = 'none';

        triggerHaptic();
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

    // v0.5: failType is 'timeout' for falls (Parity's only fall), ignored for wins
    function recordGameResult(isWin, peakFloor, failType) {
        const stats = getStats();
        stats.played++;
        if (isWin) {
            stats.wins++;
            stats.streak++;
            if (stats.bestTimeSeconds === null || totalElapsedSeconds < stats.bestTimeSeconds) {
                stats.bestTimeSeconds = totalElapsedSeconds;
            }
        } else {
            stats.streak = 0;
            const key = String(peakFloor);
            if (!stats.fallsByFloor[key]) stats.fallsByFloor[key] = { wrong: 0, timeout: 0 };
            stats.fallsByFloor[key][failType === 'wrong' ? 'wrong' : 'timeout']++;
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

        // v0.5: falls by floor (time-outs, since that is Parity's only fall)
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
