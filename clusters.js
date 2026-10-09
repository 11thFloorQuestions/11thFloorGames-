// ==========================================================================
// 11th Floor Clusters — Core Game Engine & Active Timer
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Game State Variables
    let currentFloorIndex = 0;
    let selectedTiles = [];
    let lives = 3;
    let soundEnabled = false;
    let isProcessing = false;
    let activeGameData = [];

    // Session Timer State
    let startTime = 0;
    let timerInterval = null;
    let timeElapsedSeconds = 0;

    const STATS_KEY = '11th_floor_clusters_stats';

    // DOM Element References
    const startScreen = document.getElementById('start-screen');
    const startClimbBtn = document.getElementById('btn-start-climb');
    const hudContainer = document.getElementById('floor-hud-container');
    const mainContent = document.getElementById('game-main-content');
    const activeGameTimer = document.getElementById('active-game-timer');
    const floorNumberVal = document.getElementById('floor-number-val');
    const livesContainer = document.getElementById('lives-container');
    const tileGrid = document.getElementById('tile-grid');
    const solvedGroupsContainer = document.getElementById('solved-groups-container');
    const puzzlePrompt = document.getElementById('puzzle-prompt');
    const statusMessage = document.getElementById('status-message');

    const submitBtn = document.getElementById('btn-submit');
    const shuffleBtn = document.getElementById('btn-shuffle');
    const soundBtn = document.getElementById('btn-sound');

    // Initialize Game
    init();

    function init() {
        if (window.CLUSTERS_DAILY_SET) {
            activeGameData = Array.isArray(window.CLUSTERS_DAILY_SET) 
                ? window.CLUSTERS_DAILY_SET 
                : (window.CLUSTERS_DAILY_SET.floors || []);
        } else {
            activeGameData = [];
        }

        bindEvents();
    }

    function bindEvents() {
        if (startClimbBtn) startClimbBtn.addEventListener('click', startGame);
        if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
        if (shuffleBtn) shuffleBtn.addEventListener('click', handleShuffle);

        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                soundEnabled = !soundEnabled;
                soundBtn.textContent = `SOUND: ${soundEnabled ? 'ON' : 'OFF'}`;
            });
        }
    }

    // ==========================================
    // SESSION STOPWATCH TIMER ENGINE
    // ==========================================

    function startTimer() {
        stopTimer();
        timeElapsedSeconds = 0;
        startTime = Date.now();
        if (activeGameTimer) {
            activeGameTimer.style.display = 'block';
            activeGameTimer.textContent = '00:00';
        }
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }

    function stopTimer() {
        if (timerInterval) clearInterval(timerInterval);
    }

    function updateTimerDisplay() {
        timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        if (activeGameTimer) {
            activeGameTimer.textContent = formatTime(timeElapsedSeconds);
        }
    }

    function formatTime(totalSeconds) {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    // ==========================================
    // CORE GAMEPLAY FLOW
    // ==========================================

    function startGame() {
        if (!activeGameData || activeGameData.length === 0) {
            if (window.CLUSTERS_DAILY_SET) {
                activeGameData = Array.isArray(window.CLUSTERS_DAILY_SET) 
                    ? window.CLUSTERS_DAILY_SET 
                    : (window.CLUSTERS_DAILY_SET.floors || []);
            }
        }

        if (startScreen) startScreen.style.display = 'none';
        if (hudContainer) hudContainer.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'flex';

        currentFloorIndex = 0;
        lives = 3;
        updateLivesUI();
        startTimer();
        loadFloor(currentFloorIndex);
    }

    function loadFloor(index) {
        if (!activeGameData || index >= activeGameData.length) return;

        const floorData = activeGameData[index];
        selectedTiles = [];
        isProcessing = false;

        if (floorNumberVal) floorNumberVal.textContent = `FLOOR ${String(index + 1).padStart(2, '0')}`;
        if (puzzlePrompt) puzzlePrompt.textContent = floorData.prompt || 'Group the tiles into 4 categories of 3';
        if (statusMessage) statusMessage.textContent = '';

        if (solvedGroupsContainer) solvedGroupsContainer.innerHTML = '';
        if (submitBtn) submitBtn.disabled = true;

        renderTileGrid(floorData);
    }

    function renderTileGrid(floorData) {
        if (!tileGrid) return;
        tileGrid.innerHTML = '';

        let allTiles = [];
        if (floorData.groups) {
            floorData.groups.forEach((group, groupIdx) => {
                group.words.forEach(word => {
                    allTiles.push({ word, groupIdx });
                });
            });
        }

        // Shuffle tiles
        for (let i = allTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]];
        }

        allTiles.forEach(tileObj => {
            const tileElem = document.createElement('div');
            tileElem.className = 'cluster-tile';
            tileElem.textContent = tileObj.word;
            tileElem.dataset.groupIdx = tileObj.groupIdx;

            tileElem.addEventListener('click', () => handleTileSelect(tileElem));
            tileGrid.appendChild(tileElem);
        });
    }

    function handleTileSelect(tileElem) {
        if (isProcessing || tileElem.classList.contains('success')) return;

        if (tileElem.classList.contains('selected')) {
            tileElem.classList.remove('selected');
            selectedTiles = selectedTiles.filter(t => t !== tileElem);
        } else {
            if (selectedTiles.length < 3) {
                tileElem.classList.add('selected');
                selectedTiles.push(tileElem);
            }
        }

        if (submitBtn) submitBtn.disabled = (selectedTiles.length !== 3);
    }

    function handleShuffle() {
        if (isProcessing || !tileGrid) return;
        const tiles = Array.from(tileGrid.children);
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            tileGrid.appendChild(tiles[j]);
        }
    }

    function handleSubmit() {
        if (selectedTiles.length !== 3 || isProcessing) return;
        isProcessing = true;

        const firstGroup = selectedTiles[0].dataset.groupIdx;
        const isMatch = selectedTiles.every(t => t.dataset.groupIdx === firstGroup);

        if (isMatch) {
            selectedTiles.forEach(t => {
                t.classList.remove('selected');
                t.classList.add('success');
            });

            if (statusMessage) {
                statusMessage.textContent = 'CLUSTER CLEARED!';
                statusMessage.style.color = 'var(--state-success)';
            }

            setTimeout(() => {
                currentFloorIndex++;
                if (currentFloorIndex >= activeGameData.length) {
                    stopTimer();
                    if (statusMessage) statusMessage.textContent = 'DESTINATION REACHED! PERFECT CLIMB.';
                } else {
                    loadFloor(currentFloorIndex);
                }
            }, 1000);
        } else {
            lives--;
            updateLivesUI();

            selectedTiles.forEach(t => t.classList.remove('selected'));
            selectedTiles = [];
            if (submitBtn) submitBtn.disabled = true;

            if (lives <= 0) {
                stopTimer();
                if (statusMessage) {
                    statusMessage.textContent = 'OUT OF LIVES — RESETTING TO FLOOR 01';
                    statusMessage.style.color = 'var(--state-error)';
                }
                setTimeout(() => {
                    startGame();
                }, 1500);
            } else {
                if (statusMessage) {
                    statusMessage.textContent = 'INCORRECT CLUSTER — TRY AGAIN';
                    statusMessage.style.color = 'var(--state-error)';
                }
                isProcessing = false;
            }
        }
    }

    function updateLivesUI() {
        for (let i = 1; i <= 3; i++) {
            const pip = document.getElementById(`pip-${i}`);
            if (pip) {
                pip.classList.toggle('lost', i > lives);
            }
        }
    }
});
