// 11th Floor Word Climb - Daily Game Engine

let currentFloor = 1;
let currentGuess = "";
let isTransitioning = false;
let masterNineLetterWord = "";
let initialDailyWheel = [];
let wheelLetters = [];
let validWordSet = null;

// Timer Variables
let startTime = 0;
let timerInterval = null;
let timeElapsedSeconds = 0;

// Local Storage Player Stats Key
const STATS_KEY = '11th_floor_wordclimb_stats';

document.addEventListener("DOMContentLoaded", () => {
    setupLandingScreen();
    setupVaultModal();
    bindExtraEvents();
    updateStatsDisplay();

    window.addEventListener("resize", () => {
        if (wheelLetters.length > 0) {
            renderWheel(wheelLetters);
        }
    });
});

function getOrdinalFloorHTML(floorNum) {
    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];
    const ord = ordinals[floorNum - 1] || `${floorNum}th`;
    return `<span style="color: var(--genre-blue, #3B82F6); font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
}

// --- Timer Functions ---
function startTimer() {
    stopTimer();
    timeElapsedSeconds = 0;
    startTime = Date.now();
    const activeGameTimer = document.getElementById("active-game-timer");
    if (activeGameTimer) {
        activeGameTimer.style.display = "block";
        activeGameTimer.textContent = "00:00";
    }
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
}

function updateTimerDisplay() {
    timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const activeGameTimer = document.getElementById("active-game-timer");
    if (activeGameTimer) {
        activeGameTimer.textContent = formatTime(timeElapsedSeconds);
    }
}

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

async function fetchFileWithFallbacks(filename) {
    const candidatePaths = [
        `./${filename}`,
        `./archives/${filename}`,
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

async function resolveDictionary() {
    if (window.WORD_LIST_LOADED && window.WORD_LIST && window.WORD_LIST.size > 0) {
        validWordSet = window.WORD_LIST;
        return true;
    }

    if (window.WORD_LIST_PROMISE) {
        const success = await window.WORD_LIST_PROMISE;
        if (success && window.WORD_LIST && window.WORD_LIST.size > 0) {
            validWordSet = window.WORD_LIST;
            return true;
        }
    }

    if (typeof window.fetchDictionary === 'function') {
        const retrySuccess = await window.fetchDictionary();
        if (retrySuccess && window.WORD_LIST && window.WORD_LIST.size > 0) {
            validWordSet = window.WORD_LIST;
            return true;
        }
    }

    return false;
}

function setupLandingScreen() {
    const startBtn = document.getElementById("start-climb-btn");
    if (!startBtn) return;

    startBtn.onclick = async () => {
        startBtn.textContent = "Loading...";
        startBtn.style.opacity = "0.7";
        startBtn.disabled = true;

        const success = await resolveDictionary();

        if (success && validWordSet && validWordSet.size > 0) {
            launchGameWorkspace();
        } else {
            startBtn.textContent = "Tap to Retry";
            startBtn.style.opacity = "1";
            startBtn.disabled = false;
        }
    };
}

function setupVaultModal() {
    const statsBtn = document.getElementById("btn-landing-stats");
    const closeBtn = document.getElementById("btn-close-vault");
    const vaultModal = document.getElementById("modal-vault");

    if (statsBtn && vaultModal) {
        statsBtn.addEventListener("click", () => {
            vaultModal.classList.remove
