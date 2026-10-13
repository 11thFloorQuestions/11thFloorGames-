// ==========================================================================
// 11th Floor Word Climb - Main Daily Game Engine
// Active Master Word: MAGNITUDE (Set 57)
// ==========================================================================

let currentFloor = 1;
let currentGuess = "";
let isTransitioning = false;
let masterNineLetterWord = "";
let initialDailyWheel = [];
let wheelLetters = [];

// HARDENED FALLBACK DICTIONARY - Full Coverage for Set 57 (MAGNITUDE)
const INTERNAL_FALLBACK_WORDS = new Set([
    "GIANT", "AGENT", "GUIDE", "IMAGE", "MEDIA", "AMEND", "UNITE", "MINED", "GAUNT",
    "UNITED", "DATING", "MAGNET", "GAINED", "TANDEM", "UNTIED",
    "UNTAMED", "GAUNTED",
    "UNTAMING",
    "MAGNITUDE"
]);

let validWordSet = INTERNAL_FALLBACK_WORDS;

// Timer Variables
let startTime = 0;
let timerInterval = null;
let timeElapsedSeconds = 0;

// Local Storage Player Stats Key
const STATS_KEY = '11th_floor_wordclimb_stats';

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    if (startScreen) startScreen.style.display = "flex";

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
    if (totalSeconds === null || totalSeconds === undefined) return "--:--";
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
        try {
            const success = await window.WORD_LIST_PROMISE;
            if (success && window.WORD_LIST && window.WORD_LIST.size > 0) {
                validWordSet = window.WORD_LIST;
                return true;
            }
        } catch (e) {}
    }

    if (typeof window.fetchDictionary === 'function') {
        try {
            const retrySuccess = await window.fetchDictionary();
            if (retrySuccess && window.WORD_LIST && window.WORD_LIST.size > 0) {
                validWordSet = window.WORD_LIST;
                return true;
            }
        } catch (e) {}
    }

    validWordSet = INTERNAL_FALLBACK_WORDS;
    return true;
}

function setupLandingScreen() {
    const startBtn = document.getElementById("start-climb-btn");
    if (!startBtn) return;

    startBtn.onclick = async () => {
        startBtn.textContent = "Loading...";
        startBtn.style.opacity = "0.7";
        startBtn.disabled = true;

        await resolveDictionary();
        launchGameWorkspace();
    };
}

function setupVaultModal() {
    const statsBtn = document.getElementById("btn-landing-stats");
    const closeBtn = document.getElementById("btn-close-vault");
    const vaultModal = document.getElementById("modal-vault");

    if (statsBtn && vaultModal) {
        statsBtn.addEventListener("click", () => {
            vaultModal.classList.remove("hidden");
            populateVault();
        });
    }

    if (closeBtn && vaultModal) {
        closeBtn.addEventListener("click", () => {
            vaultModal.classList.add("hidden");
            const victoryScreen = document.getElementById("victory-screen");
            if (victoryScreen && victoryScreen.style.display !== "none") {
                resetToStartScreen();
            }
        });
    }
}

function bindExtraEvents() {
    const victoryStatsBtn = document.getElementById("btn-victory-stats");
    const statsModal = document.getElementById("modal-vault");

    if (victoryStatsBtn) {
        victoryStatsBtn.addEventListener("click", () => {
            if (statsModal) statsModal.classList.remove("hidden");
            populateVault();
        });
    }
}

async function populateVault() {
    const vaultList = document.getElementById("vault-list");
    if (!vaultList) return;

    vaultList.innerHTML = "";
    let archiveId = 1;

    while (archiveId <= 100) {
        const paddedId = String(archiveId).padStart(2, '0');
        const filename = `sandbox-wc.${paddedId}.json`;
        const data = await fetchFileWithFallbacks(filename);

        if (data) {
            const btn = document.createElement("button");
            btn.className = "vault-item-btn";
            btn.innerHTML = `<strong>Archive ${paddedId}</strong>`;
            btn.onclick = () => {
                loadVaultArchive(paddedId);
            };
            vaultList.appendChild(btn);
        }
        archiveId++;
    }
}

function shuffleAndVerifyWheel(letters, masterWord) {
    let arr = [...letters];
    const target = (masterWord || "").toUpperCase();

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    let attempts = 0;
    do {
        shuffle(arr);
        attempts++;
        const currentStr = arr.join("");
        const doubleStr = currentStr + currentStr;
        const matchesClockwise = target.length > 0 && doubleStr.includes(target);

        if (!matchesClockwise || attempts > 50) {
            break;
        }
    } while (true);

    return arr;
}

async function loadVaultArchive(paddedId) {
    const filename = `sandbox-wc.${paddedId}.json`;
    const data = await fetchFileWithFallbacks(filename);

    if (data && data.masterWord && data.wheelLetters) {
        await resolveDictionary();

        masterNineLetterWord = data.masterWord.toUpperCase();
        initialDailyWheel = shuffleAndVerifyWheel(data.wheelLetters, masterNineLetterWord);
        wheelLetters = [...initialDailyWheel];

        const startScreen = document.getElementById("start-screen");
        const victoryScreen = document.getElementById("victory-screen");
        const gameplayHeader = document.getElementById("gameplay-header");
        const gameWorkspace = document.getElementById("game-workspace");
        const hudContainer = document.getElementById("floor-hud-container");
        const gameControls = document.getElementById("game-controls");
        const vaultModal = document.getElementById("modal-vault");
        const footerText = document.getElementById("footer-text");

        if (startScreen) startScreen.style.display = "none";
        if (victoryScreen) victoryScreen.style.display = "none";
        if (gameplayHeader) gameplayHeader.style.display = "flex";
        if (hudContainer) hudContainer.style.display = "flex";
        if (gameWorkspace) gameWorkspace.style.display = "flex";
        if (gameControls) gameControls.style.display = "flex";
        if (vaultModal) vaultModal.classList.add("hidden");
        if (footerText) footerText.style.display = "block";

        startNewGame();
    } else {
        alert(`Could not locate Archive ${paddedId} (sandbox-wc.${paddedId}.json).`);
    }
}

function launchGameWorkspace() {
    const startScreen = document.getElementById("start-screen");
    const victoryScreen = document.getElementById("victory-screen
