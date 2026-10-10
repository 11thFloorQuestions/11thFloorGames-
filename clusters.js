/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - CORE GAME LOGIC (clusters.js)
 * ============================================================================
 * Sequential Clue Target Engine, 20s Stage Countdown Timer, Global Session Timer,
 * Lives & Reset System, 10 Playable Floors leading to 11th Floor Destination.
 * ============================================================================
 */

(function () {
    'use strict';

    let puzzleData = null;
    let currentFloor = 1;
    let gameState = 'intro';
    let selectedTiles = [];
    let activeTiles = [];
    let remainingGroups = [];
    let currentTargetGroup = null;
    let currentLives = 3;

    // Session Stopwatch Timer State Variables
    let startTime = 0;
    let timerInterval = null;
    let timeElapsedSeconds = 0;

    // Stage Countdown Bar Timer State Variables
    let stageTimer = null;
    let stageTimeLeft = 20;

    // Local Storage Player Stats Key
    const STATS_KEY = '11th_floor_clusters_stats';

    const floorNumVal = document.getElementById('floor-number-val');
    const floorRuleText = document.getElementById('floor-rule-text');
    const puzzlePrompt = document.getElementById('puzzle-prompt');
    const solvedGroupsContainer = document.getElementById('solved-groups-container');
    const tileGrid = document.getElementById('tile-grid');
    const btnShuffle = document.getElementById('btn-shuffle');
    const btnSubmit = document.getElementById('btn-submit');
    const statusMessage = document.getElementById('status-message');
    const penaltyOverlay = document.getElementById('penalty-overlay');
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
    const pips = [document.getElementById('pip-1'), document.getElementById('pip-2'), document.getElementById('pip-3')];

    const victoryScreen = document.getElementById('victory-screen');
    const victoryTimeDisplay = document.getElementById('victory-time-display');
    const victoryTimeRowDisplay = document.getElementById('victory-time-row-display');
    const victoryStreakDisplay = document.getElementById('victory-streak-display');
    const footerText = document.getElementById('footer-text');

    const statsModal = document.getElementById('modal-vault');
    const gameOverModal = document.getElementById('modal-game-over');
    const statsBtnLanding = document.getElementById('btn-landing-stats');
    const victoryStatsBtn = document.getElementById('btn-victory-stats');
    const closeVaultBtn = document.getElementById('btn-close-vault');
    const btnTryAgain = document.getElementById('btn-try-again');
    const btnBackVault = document.getElementById('btn-back-vault');
    const vaultList = document.getElementById('vault-list');

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
        if (timerInterval) clearInterval(timerInterval);
    }

    function updateSessionTimerDisplay() {
        timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        if (activeGameTimer) {
            activeGameTimer.textContent = formatTime(timeElapsedSeconds);
        }
    }

    function formatTime(totalSeconds) {
        if (totalSeconds === null || totalSeconds === undefined) return "--:--";
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    // ==========================================
    // STAGE COUNTDOWN TIMER ENGINE
    // ==========================================

    function startStageTimer() {
        stopStageTimer();
        const totalDuration = 20000;
        const stageStartTime = Date.now();
        stageTimeLeft = 20;

        if (timerBarWrapper) timerBarWrapper.style.display = 'block';
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.backgroundColor = 'var(--genre-orange)';
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
                    timerBar.style.backgroundColor = 'var(--genre-orange)';
                }
            }

            if (remaining <= 0) {
                stopStageTimer();
                handleTimeExpired();
            }
        }, 50);
    }

    function stopStageTimer() {
        if (stageTimer) clearInterval(stageTimer);
    }

    function handleTimeExpired() {
        triggerHaptic([80, 50, 120]);
        handleGameOver('TIME EXPIRED');
    }

    function getOrdinalFloorHTML(floorNum) {
        const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
        const ord = ordinals[floorNum - 1] || `${floorNum}th`;
        return `<span style="color: var(--genre-orange); font-size: 1.1rem; font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
    }

    function getFailedOrdinalFloorHTML(floorNum) {
        const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
        const ord = ordinals[floorNum - 1] || `${floorNum}th`;
        return `<span style="color: var(--state-error); font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
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
        }

        renderTowerStack(0);
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
            btnStartClimb.addEventListener('click', startClimb);
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
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }

        if (victoryStatsBtn) {
            victoryStatsBtn.addEventListener('pointerdown', () => triggerHaptic(15));
            victoryStatsBtn.addEventListener('click', () => {
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

        if (btnTryAgain) {
            btnTryAgain.addEventListener('pointerdown', () => triggerHaptic(15));
            btnTryAgain.addEventListener('click', () => {
                if (gameOverModal) gameOverModal.classList.add('hidden');
                startClimb();
            });
        }

        if (btnBackVault) {
            btnBackVault.addEventListener('pointerdown', () => triggerHaptic(15));
            btnBackVault.addEventListener('click', () => {
                if (gameOverModal) gameOverModal.classList.add('hidden');
                if (statsModal) statsModal.classList.remove('hidden');
                populateVault();
            });
        }
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
        if (startScreen) startScreen.style.display = 'flex';
    }

    function renderTowerStack(activeFloor) {
        if (!towerStack) return;
        towerStack.innerHTML = '';
        for (let i = 1; i <= 10; i++) {
            const floorBar = document.createElement('div');
            floorBar.className = 'tower-floor';
            if (i === activeFloor) {
                floorBar.classList.add('active');
            } else if (i < activeFloor) {
                floorBar.classList.add('completed');
            }
            towerStack.appendChild(floorBar);
        }
    }

    function updateLivesDisplay() {
        pips.forEach((pip, index) => {
            if (!pip) return;
            if (index < currentLives) {
                pip.classList.remove('lost');
            } else {
                pip.classList.add('lost');
            }
        });
    }

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

        gameState = 'playing';
        currentLives = 3;
        updateLivesDisplay();

        if (startScreen) startScreen.style.display = 'none';
        if (victoryScreen) victoryScreen.style.display = 'none';
        if (floorHudContainer) floorHudContainer.style.display = 'flex';
        if (gameplayHeader) gameplayHeader.style.display = 'flex';
        if (timerBarWrapper) timerBarWrapper.style.display = 'block';
        if (clueBanner) clueBanner.style.display = 'block';
        if (mainContent) mainContent.style.display = 'flex';
        if (actionPanelContainer) actionPanelContainer.style.display = 'flex';
        if (footerText) footerText.style.display = 'block';

        currentFloor = 1;
        startSessionTimer();
        loadFloor(currentFloor);
    }

    function loadFloor(floorNum) {
        currentFloor = floorNum;
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
            if (currentFloor <= 4) {
                puzzlePrompt.textContent = "Select 3 tiles matching the active target cluster.";
            } else if (currentFloor >= 5 && currentFloor <= 9) {
                puzzlePrompt.textContent = "Select 3 tiles matching the active target cluster.";
            } else if (currentFloor === 10) {
                puzzlePrompt.textContent = "Select 4 tiles matching the active target cluster.";
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
                        const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
                        if (statusMessage) statusMessage.textContent = `${ordinals[currentFloor - 1].toUpperCase()} FLOOR CLEARED. ADVANCING...`;
                        setTimeout(() => loadFloor(currentFloor + 1), 900);
                    } else {
                        stopSessionTimer();
                        recordGameResult(true, 11);
                        renderVictory();
                    }
                } else {
                    setupNextStageClue();
                    renderGrid();
                }
            }, 600);

        } else {
            currentLives--;
            updateLivesDisplay();
            triggerHaptic([80, 50, 120]);

            if (currentLives > 0) {
                if (statusMessage) statusMessage.textContent = `INCORRECT. ${currentLives} LIVES REMAINING.`;
                selectedTiles = [];
                if (btnSubmit) btnSubmit.disabled = true;
                renderGrid();
                startStageTimer();
            } else {
                stopSessionTimer();
                recordGameResult(false, currentFloor);
                handleGameOver('OUT OF LIVES');
            }
        }
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

    function handleGameOver(reason) {
        stopSessionTimer();
        stopStageTimer();
        gameState = 'penalty';

        const gameOverTitle = document.getElementById('game-over-title');
        const gameOverMsg = document.getElementById('game-over-message');
        const finalFloor = document.getElementById('final-floor-reached');

        if (gameOverTitle) gameOverTitle.textContent = "ELEVATOR STOPPED";
        if (gameOverMsg) gameOverMsg.textContent = reason;
        if (finalFloor) finalFloor.innerHTML = `Stopped at ${getFailedOrdinalFloorHTML(currentFloor)}`;

        if (gameOverModal) gameOverModal.classList.remove('hidden');
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
        if (footerText) footerText.style.display = 'none';

        triggerHaptic([50, 50, 50, 50, 100]);

        const formattedTime = formatTime(timeElapsedSeconds);
        const stats = getStats();

        if (victoryTimeDisplay) victoryTimeDisplay.textContent = formattedTime;
        if (victoryTimeRowDisplay) victoryTimeRowDisplay.textContent = `${formattedTime}s`;
        if (victoryStreakDisplay) victoryStreakDisplay.textContent = `${stats.streak} Days`;

        if (victoryScreen) victoryScreen.style.display = 'flex';
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

    async function populateVault() {
        if (!vaultList) return;
        vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">Loading Archives...</div>';
        
        const fetchPromises = [];
        for (let i = 1; i <= 100; i++) {
            const paddedId = String(i).padStart(2, '0');
            fetchPromises.push(fetchFileWithFallbacks(`clusters-${paddedId}.json`).then(data => ({ id: paddedId, data })));
        }

        const results = await Promise.all(fetchPromises);
        const buttons = [];

        results.forEach(({ id, data }) => {
            if (data) {
                const btn = document.createElement('button');
                btn.className = 'vault-item-btn';
                btn.innerHTML = `<strong>Archive ${id}</strong>`;
                btn.onpointerdown = () => triggerHaptic(15);
                btn.onclick = () => loadVaultArchive(id, data);
                buttons.push(btn);
            }
        });

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

    function recordGameResult(isWin, peakFloor) {
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
        }

        if (peakFloor > stats.bestFloor) {
            stats.bestFloor = peakFloor;
        }

        try {
            localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        } catch (e) {
            console.warn("LocalStorage save blocked.");
        }
        updateStatsDisplay();
        return stats;
    }

    function getStats() {
        try {
            const raw = localStorage.getItem(STATS_KEY);
            if (!raw) {
                return { played: 0, wins: 0, streak: 0, bestFloor: 1, bestTimeSeconds: null };
            }
            return JSON.parse(raw);
        } catch (e) {
            return { played: 0, wins: 0, streak: 0, bestFloor: 1, bestTimeSeconds: null };
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
