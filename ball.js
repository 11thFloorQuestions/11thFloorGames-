// ==========================================================================
// 11th Floor TYKB (Think You Know Ball?) — Core Game Engine
// ==========================================================================

function safeAddListener(id, event, handler) {
    const el = document.getElementById(id);
    if (el) {
        // Bind pointerdown for immediate, unblocked mobile haptic feedback
        el.addEventListener('pointerdown', () => {
            triggerHaptic(15);
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
    stats: {
        played: 0,
        wins: 0,
        streak: 0,
        bestFloor: 1,
        bestTimeSeconds: null
    }
};

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
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}


// ==========================================
// AUDIO ENGINE
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
    const screens = ['victory-screen', 'game-screen', 'floor-hud-container', 'gameplay-header', 'active-game-timer', 'footer-text'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const landing = document.getElementById('landing-screen');
    if (landing
