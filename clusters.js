/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - CORE GAME LOGIC (clusters.js)
 * ============================================================================
 * Sequential Clue Target Engine, 15s Stage Countdown Timer, Global Session Timer,
 * Single Mistake Game-Over Reset, 10 Playable Floors leading to 11th Floor.
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

    // Session Stopwatch Timer State Variables
    let startTime = 0;
    let timerInterval = null;
    let timeElapsedSeconds = 0;

    // Stage Countdown Bar Timer State Variables (15 Seconds Per Stage)
    let stageTimer = null;
    let stageTimeLeft = 15;

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
        recordGameResult(false, currentFloor);
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
            btnBackVault.addEventListener('pointerdown', () => triggerH
