// ==========================================================================
// 11th Floor Word Climb - Main Daily Game Engine
// Active Master Word: RETAINERS (Set 58)
//
// v0.5 changes (marked "v0.5"), same shape as the other games:
//  - A time limit on every floor, with a timer bar (edit FLOOR_TIME_LIMITS below)
//  - Each wheel letter can be used once (before, a letter could be tapped repeatedly)
//  - The same word cannot be used twice in one climb (before, floors 1 to 3 could take one word)
//  - If the word list cannot load, the game says so instead of silently using a 25-word list
//  - Wheel redrawn: bigger circles that touch edge to edge
//  - Lift rides: opening ride, rise between floors, victory ride, ride back after a fall
//  - Session clock starts when floor 1 first appears and never restarts at a fall
//  - Accuracy: red number = floor of the first WRONG WORD. A timeout never counts.
//  - Every fall logged in stats (floor + wrong/timeout)
//  - Attempt counter, receipt reads "on Nth attempt", date, Accuracy (x/10)
//  - Time shown as m:ss. Falls say "Ground Floor". 0.4s flash after a correct word.
//  - Archive list loads in batches of 5 (was 100 files one at a time)
//  - "?" rules pop-up (landing screen only), sound button now toggles its label
//  - Debug switches: ?debug=win, ?debug=ride, ?debug=floor&n=3 (see runDebugSwitch)
// ==========================================================================

let currentFloor = 1;
let isTransitioning = false;
let masterNineLetterWord = "";
let initialDailyWheel = [];   // [{ id, ch }]
let wheelLetters = [];        // [{ id, ch }] in current wheel order
let guessIds = [];            // ids of wheel letters tapped, in order
let usedWords = new Set();    // words already accepted in this climb

// v0.5: attempt and accuracy tracking
let attemptsToday = 1;
let firstWrongFloor = null;   // floor of the first WRONG WORD (timeouts never count)
let debugMode = false;
let soundEnabled = true;

// v0.5: seconds allowed on each floor. Index 0 is the 1st floor. Edit freely.
const FLOOR_TIME_LIMITS = [20, 20, 20, 25, 25, 25, 30, 30, 35, 45];

const CORRECT_FLASH_MS = 400; // v0.5: was 1000
const FALL_PAUSE_MS = 1400;

// Small list used ONLY by the debug floor jump when the real word list cannot load.
const INTERNAL_FALLBACK_WORDS = new Set([
    "TRAIN", "STARE", "TEARS", "ENTER", "RAISE", "STERN", "SATIN", "STAIN", "SIREN",
    "RETAIN", "STRAIN", "RETINA", "RASTER",
    "RETAINS", "RETINAS", "STAINER", "TERRAIN",
    "RETAINER", "RESTRAIN", "TERRAINS",
    "RETAINERS"
]);

let validWordSet = new Set();

// Floor timer (per floor) and session clock (whole climb)
let floorTimer = null;
let startTime = 0;
let timerInterval = null;
let timeElapsedSeconds = 0;

// Local Storage Player Stats Key
const STATS_KEY = "11th_floor_wordclimb_stats";

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    if (startScreen) startScreen.style.display = "flex";

    setupLandingScreen();
    setupVaultModal();
    bindExtraEvents();
    attachControlHandlers();
    updateStatsDisplay();

    window.addEventListener("resize", () => {
        if (wheelLetters.length > 0) {
            renderWheel(wheelLetters);
        }
    });

    runDebugSwitch();
});

// ---------- helpers ----------

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

function getOrdinalFloorHTML(floorNum) {
    const ord = ordinal(floorNum);
    return `<span style="color: var(--genre-blue, #3B82F6); font-weight: 800;">${ord}</span> <span style="color: #ffffff;">Floor</span>`;
}

function triggerHaptic(pattern) {
    if ("vibrate" in navigator) {
        try { navigator.vibrate(pattern); } catch (e) {}
    }
}

// ---------- session clock ----------

function startTimer() {
    stopTimer();
    timeElapsedSeconds = 0;
    startTime = Date.now();
    const activeGameTimer = document.getElementById("active-game-timer");
    if (activeGameTimer) {
        activeGameTimer.style.display = "block";
        activeGameTimer.textContent = "0:00";
    }
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null; // v0.5: so "is the clock running?" is a real question
    }
}

function updateTimerDisplay() {
    timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const activeGameTimer = document.getElementById("active-game-timer");
    if (activeGameTimer) {
        activeGameTimer.textContent = formatTime(timeElapsedSeconds);
    }
}

// v0.5: m:ss, no leading zero on the minutes (for example 1:32)
function formatTime(totalSeconds) {
    if (totalSeconds === null || totalSeconds === undefined) return "--:--";
    const m = Math.floor(totalSeconds / 60);
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

// ---------- floor timer (v0.5) ----------

function startFloorTimer(floor) {
    stopFloorTimer();
    const totalDuration = (FLOOR_TIME_LIMITS[floor - 1] || 30) * 1000;
    const floorStart = Date.now();
    const timerBar = document.getElementById("timer-bar");

    if (timerBar) {
        timerBar.style.width = "100%";
        timerBar.style.backgroundColor = "var(--state-active)";
    }

    floorTimer = setInterval(() => {
        const remaining = Math.max(0, totalDuration - (Date.now() - floorStart));
        if (timerBar) {
            timerBar.style.width = `${(remaining / totalDuration) * 100}%`;
            timerBar.style.backgroundColor = remaining <= totalDuration / 2 ? "var(--state-error)" : "var(--state-active)";
        }
        if (remaining <= 0) {
            stopFloorTimer();
            handleTimeExpired();
        }
    }, 50);
}

function stopFloorTimer() {
    if (floorTimer) {
        clearInterval(floorTimer);
        floorTimer = null;
    }
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
    const overlay = document.getElementById("lift-overlay");
    const graphic = document.getElementById("lift-graphic");

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
        overlay.classList.add("hidden");
        graphic.classList.remove("rising");
    };

    graphic.classList.remove("rising");
    graphic.style.setProperty("--lift-ms", `${durationMs}ms`);
    overlay.classList.toggle("victory", !!(options && options.victory));
    overlay.classList.remove("hidden");
    void graphic.offsetWidth;
    graphic.classList.add("rising");

    arriveTimeout = setTimeout(finish, durationMs);

    // Tap to skip. Short delay so the tap that started the ride cannot skip it.
    setTimeout(() => {
        if (!finished && myToken === liftRideToken) {
            overlay.onclick = finish;
        }
    }, 250);
}

// ---------- data loading ----------

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

// v0.5: returns true only when the REAL word list is loaded. No silent fallback.
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

    if (typeof window.fetchDictionary === "function") {
        try {
            const retrySuccess = await window.fetchDictionary();
            if (retrySuccess && window.WORD_LIST && window.WORD_LIST.size > 0) {
                validWordSet = window.WORD_LIST;
                return true;
            }
        } catch (e) {}
    }

    return false;
}

function showStartError(text) {
    const el = document.getElementById("start-error");
    if (!el) return;
    el.textContent = text || "";
    el.style.display = text ? "block" : "none";
}

function setupLandingScreen() {
    const startBtn = document.getElementById("start-climb-btn");
    if (!startBtn) return;

    startBtn.onclick = async () => {
        showStartError("");
        startBtn.textContent = "Loading...";
        startBtn.style.opacity = "0.7";
        startBtn.disabled = true;

        const ok = await resolveDictionary();

        startBtn.textContent = "Start Climb";
        startBtn.style.opacity = "1";
        startBtn.disabled = false;

        if (!ok) {
            showStartError("Couldn't load the word list. Check your connection and tap Start Climb again.");
            return;
        }
        launchGameWorkspace();
    };
}

function setupVaultModal() {
    const statsBtn = document.getElementById("btn-landing-stats");
    const closeBtn = document.getElementById("btn-close-vault");
    const vaultModal = document.getElementById("modal-vault");

    if (statsBtn && vaultModal) {
        statsBtn.addEventListener("click", () => {
            updateStatsDisplay();
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
            updateStatsDisplay();
            if (statsModal) statsModal.classList.remove("hidden");
            populateVault();
        });
    }

    // v0.5: rules pop-up
    const rulesBtn = document.getElementById("btn-rules");
    const closeRulesBtn = document.getElementById("btn-close-rules");
    const rulesModal = document.getElementById("modal-rules");
    if (rulesBtn && rulesModal) rulesBtn.addEventListener("click", () => rulesModal.classList.remove("hidden"));
    if (closeRulesBtn && rulesModal) closeRulesBtn.addEventListener("click", () => rulesModal.classList.add("hidden"));

    // v0.5: the sound button had no handler. It now toggles its label like the other games.
    const soundBtn = document.getElementById("btn-sound");
    if (soundBtn) {
        soundBtn.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            soundBtn.textContent = `SOUND: ${soundEnabled ? "ON" : "OFF"}`;
        });
    }
}

function setRulesButtonVisible(visible) {
    const rulesBtn = document.getElementById("btn-rules");
    if (rulesBtn) rulesBtn.style.display = visible ? "" : "none";
}

// v0.5: batches of 5, stops at the first batch with a missing file
async function populateVault() {
    const vaultList = document.getElementById("vault-list");
    if (!vaultList) return;

    vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">Loading Archives...</div>';

    const BATCH_SIZE = 5;
    const MAX_ARCHIVES = 100;
    const buttons = [];
    let currentId = 1;

    while (currentId <= MAX_ARCHIVES) {
        const batchPromises = [];
        for (let i = 0; i < BATCH_SIZE && (currentId + i) <= MAX_ARCHIVES; i++) {
            const paddedId = String(currentId + i).padStart(2, "0");
            batchPromises.push(
                fetchFileWithFallbacks(`sandbox-wc.${paddedId}.json`).then(data => ({ id: paddedId, data }))
            );
        }

        const batchResults = await Promise.all(batchPromises);
        let missingFound = false;

        batchResults.forEach(({ id, data }) => {
            if (data) {
                const btn = document.createElement("button");
                btn.className = "vault-item-btn";
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

    vaultList.innerHTML = "";
    if (buttons.length === 0) {
        vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">No archives found.</div>';
    } else {
        buttons.forEach(btn => vaultList.appendChild(btn));
    }
}

// ---------- wheel ----------

// Letters become { id, ch } objects so a tapped letter can be tracked even after a shuffle.
function makeWheelTiles(chars) {
    return chars.map((ch, i) => ({ id: i, ch }));
}

// Keeps the wheel from spelling the master word clockwise (so it never gives the answer away).
function shuffleAndVerifyWheel(tiles, masterWord) {
    let arr = [...tiles];
    const target = (masterWord || "").toUpperCase();

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    let attempts = 0;
    while (true) {
        shuffle(arr);
        attempts++;
        const currentStr = arr.map(t => t.ch).join("");
        const doubleStr = currentStr + currentStr;
        const matchesClockwise = target.length > 0 && doubleStr.includes(target);
        if (!matchesClockwise || attempts > 50) break;
    }

    return arr;
}

async function loadVaultArchive(paddedId) {
    const filename = `sandbox-wc.${paddedId}.json`;
    const data = await fetchFileWithFallbacks(filename);

    if (data && data.masterWord && data.wheelLetters) {
        const ok = await resolveDictionary();
        if (!ok) {
            const vaultModal = document.getElementById("modal-vault");
            if (vaultModal) vaultModal.classList.add("hidden");
            showStartError("Couldn't load the word list. Check your connection and try again.");
            return;
        }

        masterNineLetterWord = data.masterWord.toUpperCase();
        initialDailyWheel = shuffleAndVerifyWheel(makeWheelTiles(data.wheelLetters), masterNineLetterWord);

        const vaultModal = document.getElementById("modal-vault");
        if (vaultModal) vaultModal.classList.add("hidden");

        showGameChrome();
        startClimb();
    } else {
        alert(`Could not locate Archive ${paddedId} (sandbox-wc.${paddedId}.json).`);
    }
}

function launchGameWorkspace() {
    initDailyPuzzle();
    showGameChrome();
    startClimb();
}

// Shows the in-game screen (header, HUD, play card, buttons, footer).
function showGameChrome() {
    const startScreen = document.getElementById("start-screen");
    const victoryScreen = document.getElementById("victory-screen");
    const gameplayHeader = document.getElementById("gameplay-header");
    const gameWorkspace = document.getElementById("game-workspace");
    const hudContainer = document.getElementById("floor-hud-container");
    const gameControls = document.getElementById("game-controls");
    const footerText = document.getElementById("footer-text");

    if (startScreen) startScreen.style.display = "none";
    if (victoryScreen) victoryScreen.style.display = "none";
    if (gameplayHeader) gameplayHeader.style.display = "flex";
    if (hudContainer) hudContainer.style.display = "flex";
    if (gameWorkspace) gameWorkspace.style.display = "flex";
    if (gameControls) gameControls.style.display = "flex";
    if (footerText) footerText.style.display = "block";
    setRulesButtonVisible(false);
}

function resetToStartScreen() {
    stopTimer();
    stopFloorTimer();
    const victoryScreen = document.getElementById("victory-screen");
    const hudContainer = document.getElementById("floor-hud-container");
    const gameWorkspace = document.getElementById("game-workspace");
    const gameControls = document.getElementById("game-controls");
    const gameplayHeader = document.getElementById("gameplay-header");
    const activeGameTimer = document.getElementById("active-game-timer");
    const startScreen = document.getElementById("start-screen");

    if (victoryScreen) victoryScreen.style.display = "none";
    if (hudContainer) hudContainer.style.display = "none";
    if (gameWorkspace) gameWorkspace.style.display = "none";
    if (gameControls) gameControls.style.display = "none";
    if (gameplayHeader) gameplayHeader.style.display = "none";
    if (activeGameTimer) activeGameTimer.style.display = "none";
    if (startScreen) startScreen.style.display = "flex";
    setRulesButtonVisible(true);
}

// DAILY PUZZLE INITIALIZATION - RETAINERS (Set 58)
function initDailyPuzzle() {
    masterNineLetterWord = "RETAINERS";
    const initialArr = ["R", "E", "T", "A", "I", "N", "E", "R", "S"];
    initialDailyWheel = shuffleAndVerifyWheel(makeWheelTiles(initialArr), masterNineLetterWord);
}

// Fresh climb from the landing screen or an archive. Resets the session.
function startClimb() {
    // v0.5: a new climb is a new session
    stopTimer();
    stopFloorTimer();
    attemptsToday = 1;
    firstWrongFloor = null;
    usedWords = new Set();
    wheelLetters = [...initialDailyWheel];

    rideToFloorOne();
}

// Lobby to the 1st floor: the opening ride, and the ride back after every fall.
// The session clock starts when floor 1 first appears and then keeps running.
function rideToFloorOne() {
    isTransitioning = true;
    currentFloor = 1;
    guessIds = [];
    showMessage("");

    const floorVal = document.getElementById("floor-number-val");
    if (floorVal) floorVal.innerHTML = getOrdinalFloorHTML(1);
    updateElevatorShaft(1);

    const rideMs = liftFirstRideDone ? LIFT_RISE_MS : LIFT_OPENING_MS;
    liftFirstRideDone = true;
    playLiftRide(rideMs, () => {
        if (!timerInterval) startTimer();
        setupFloor(1);
    });
}

function setupFloor(floor) {
    currentFloor = floor;
    guessIds = [];
    isTransitioning = false;
    showMessage("");

    const floorVal = document.getElementById("floor-number-val");
    if (floorVal) {
        floorVal.innerHTML = getOrdinalFloorHTML(floor);
    }

    const reqLen = getRequiredWordLength(floor);
    const ruleText = document.getElementById("floor-rule-text");
    if (ruleText) {
        ruleText.textContent = `${reqLen}-letter English word • No mistakes!`;
    }

    updateElevatorShaft(floor);
    renderTargetSlots(floor);
    renderWheel(wheelLetters);
    updateGuessDisplay();
    startFloorTimer(floor);
}

function getRequiredWordLength(floor) {
    if (floor >= 1 && floor <= 3) return 5;
    if (floor >= 4 && floor <= 6) return 6;
    if (floor >= 7 && floor <= 8) return 7;
    if (floor === 9) return 8;
    if (floor === 10) return 9;
    return 5;
}

function updateElevatorShaft(floor, failedFloor) {
    const slots = document.querySelectorAll(".tower-floor, .elevator-slot, .floor-block");
    slots.forEach(slot => {
        const f = parseInt(slot.getAttribute("data-floor"), 10);
        slot.classList.remove("active", "completed", "failed");
        if (failedFloor && f === failedFloor) {
            slot.classList.add("failed");
        } else if (f === floor) {
            slot.classList.add("active");
        } else if (f < floor) {
            slot.classList.add("completed");
        }
    });
}

function renderTargetSlots(floor) {
    const slotsContainer = document.getElementById("target-word-slots");
    if (!slotsContainer) return;

    slotsContainer.innerHTML = "";
    const targetLen = getRequiredWordLength(floor);

    for (let i = 0; i < targetLen; i++) {
        const slot = document.createElement("div");
        slot.className = "target-slot";
        slotsContainer.appendChild(slot);
    }
}

function currentGuessString() {
    return guessIds.map(id => {
        const tile = wheelLetters.find(t => t.id === id);
        return tile ? tile.ch : "";
    }).join("");
}

// v0.5: the wheel. Letter circles are as big as they can be while still fitting inside the
// container, and each circle touches its neighbours edge to edge. Used letters are dimmed.
function renderWheel(tiles) {
    const wheelContainer = document.getElementById("wheel-container");
    if (!wheelContainer) return;

    wheelContainer.innerHTML = "";

    const w = Math.min(wheelContainer.clientWidth || 300, wheelContainer.clientHeight || 300);
    const centerX = (wheelContainer.clientWidth || w) / 2;
    const centerY = (wheelContainer.clientHeight || w) / 2;

    const total = tiles.length;
    const s = Math.sin(Math.PI / total);
    // Biggest ring that still fits: outer edge of a circle reaches the container edge.
    const radius = (w / 2) / (1 + s) - 1;
    // Circle diameter equals the distance between neighbours, plus 1px so edges meet.
    const btnSize = 2 * radius * s + 1;
    const fontSize = Math.round(btnSize * 0.42);

    tiles.forEach((tile, index) => {
        const angle = (index / total) * (2 * Math.PI) - (Math.PI / 2);
        const x = centerX + radius * Math.cos(angle) - (btnSize / 2);
        const y = centerY + radius * Math.sin(angle) - (btnSize / 2);
        const isUsed = guessIds.includes(tile.id);

        const btn = document.createElement("button");
        btn.className = "wheel-letter-btn";
        btn.textContent = tile.ch;
        btn.style.position = "absolute";
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
        btn.style.width = `${btnSize}px`;
        btn.style.height = `${btnSize}px`;
        btn.style.borderRadius = "50%";
        btn.style.border = "1px solid #FACC15";
        btn.style.boxShadow = isUsed ? "none" : "0 0 6px rgba(250, 204, 21, 0.2)";
        btn.style.background = "#111111";
        btn.style.color = "#ffffff";
        btn.style.fontFamily = "'Inter', sans-serif";
        btn.style.fontWeight = "800";
        btn.style.fontSize = `${fontSize}px`;
        btn.style.cursor = isUsed ? "default" : "pointer";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.opacity = isUsed ? "0.22" : "1";
        btn.style.touchAction = "manipulation";
        btn.style.outline = "none";

        btn.addEventListener("click", () => {
            if (isTransitioning || isUsed) return;
            const reqLen = getRequiredWordLength(currentFloor);
            if (guessIds.length < reqLen) {
                triggerHaptic(15);
                guessIds.push(tile.id);
                updateGuessDisplay();
                renderWheel(wheelLetters);
            }
        });

        wheelContainer.appendChild(btn);
    });

    const shuffleSize = Math.round(w * 0.3);
    const shuffleBtn = document.createElement("button");
    shuffleBtn.id = "shuffle-hub-btn";
    shuffleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" style="width: 50%; height: 50%; fill: #FACC15;">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.45 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
        </svg>
    `;
    shuffleBtn.style.position = "absolute";
    shuffleBtn.style.left = `${centerX - (shuffleSize / 2)}px`;
    shuffleBtn.style.top = `${centerY - (shuffleSize / 2)}px`;
    shuffleBtn.style.width = `${shuffleSize}px`;
    shuffleBtn.style.height = `${shuffleSize}px`;
    shuffleBtn.style.borderRadius = "50%";
    shuffleBtn.style.background = "#141414";
    shuffleBtn.style.border = "1px solid #FACC15";
    shuffleBtn.style.boxShadow = "0 0 6px rgba(250, 204, 21, 0.25)";
    shuffleBtn.style.cursor = "pointer";
    shuffleBtn.style.display = "flex";
    shuffleBtn.style.alignItems = "center";
    shuffleBtn.style.justifyContent = "center";
    shuffleBtn.style.zIndex = "10";
    shuffleBtn.style.touchAction = "manipulation";
    shuffleBtn.style.outline = "none";

    shuffleBtn.addEventListener("click", () => {
        if (isTransitioning) return;
        wheelLetters = shuffleAndVerifyWheel(wheelLetters, masterNineLetterWord);
        renderWheel(wheelLetters);
    });

    wheelContainer.appendChild(shuffleBtn);
}

function attachControlHandlers() {
    const deleteBtn = document.getElementById("action-delete-btn");
    const submitBtn = document.getElementById("action-submit-btn");

    if (deleteBtn) {
        deleteBtn.onclick = () => {
            if (isTransitioning) return;
            if (guessIds.length > 0) {
                guessIds.pop();
                updateGuessDisplay();
                renderWheel(wheelLetters);
            }
        };
    }

    if (submitBtn) {
        submitBtn.onclick = () => {
            if (isTransitioning) return;
            handleSubmission();
        };
    }
}

function updateGuessDisplay() {
    const display = document.getElementById("guess-display");
    if (!display) return;

    display.innerHTML = currentGuessString()
        .split("")
        .filter(c => c)
        .map(c => `<span style="padding: 4px 8px; background: #111111; border: 1px solid #FACC15; border-radius: 4px; font-weight: 800; color: #ffffff; font-size: 14px; box-shadow: 0 0 6px rgba(250, 204, 21, 0.25);">${c}</span>`)
        .join("");
}

// ---------- submitting a word ----------

function handleSubmission() {
    const targetLen = getRequiredWordLength(currentFloor);

    if (guessIds.length < targetLen) {
        showMessage(`NEED A ${targetLen}-LETTER WORD`, true);
        return;
    }

    const word = currentGuessString().toUpperCase();

    // v0.5: the same word cannot be used twice in a climb. Not a fall, just try another.
    if (usedWords.has(word)) {
        showMessage("ALREADY USED — TRY ANOTHER WORD", true);
        guessIds = [];
        updateGuessDisplay();
        renderWheel(wheelLetters);
        return;
    }

    const isValid = validWordSet && validWordSet.has(word);

    if (isValid) {
        stopFloorTimer();
        isTransitioning = true;
        usedWords.add(word);
        triggerHaptic([35, 40, 35]);
        showMessage("VALID WORD! ASCENDING...", false);
        fillTargetSlots(word);

        setTimeout(() => {
            if (currentFloor >= 10) {
                playLiftRide(LIFT_VICTORY_MS, handleVictory, { victory: true });
            } else {
                playLiftRide(LIFT_RISE_MS, () => {
                    currentFloor++;
                    setupFloor(currentFloor);
                });
            }
        }, CORRECT_FLASH_MS);
    } else {
        // v0.5: first wrong word of the session, on any attempt
        if (firstWrongFloor === null) {
            firstWrongFloor = currentFloor;
        }
        handleFall("wrong", "NOT A WORD — DROPPED TO GROUND FLOOR");
    }
}

function handleTimeExpired() {
    if (isTransitioning) return;
    handleFall("timeout", "TIME EXPIRED — DROPPED TO GROUND FLOOR");
}

// v0.5: a fall. No pop-up: show the message, mark the floor red, then ride back to the
// 1st floor. The session clock keeps running. type is "wrong" or "timeout".
function handleFall(type, message) {
    stopFloorTimer();
    isTransitioning = true;
    triggerHaptic([80, 50, 120]);
    showMessage(message, true);

    const slotsContainer = document.getElementById("target-word-slots");
    if (slotsContainer) {
        const slots = slotsContainer.querySelectorAll(".target-slot");
        slots.forEach(s => {
            s.style.borderColor = "#EF4444";
            s.style.color = "#FCA5A5";
            s.style.background = "rgba(239, 68, 68, 0.2)";
        });
    }
    updateElevatorShaft(0, currentFloor);

    recordGameResult(false, currentFloor, type);
    attemptsToday++;

    setTimeout(() => {
        // A new attempt starts a new set of used words and an untouched wheel.
        usedWords = new Set();
        wheelLetters = [...initialDailyWheel];
        rideToFloorOne();
    }, FALL_PAUSE_MS);
}

function fillTargetSlots(word) {
    const slotsContainer = document.getElementById("target-word-slots");
    if (!slotsContainer) return;

    const slots = slotsContainer.querySelectorAll(".target-slot");
    for (let i = 0; i < word.length; i++) {
        if (slots[i]) {
            slots[i].textContent = word[i];
            slots[i].style.borderColor = "#22c55e";
            slots[i].style.color = "#86EFAC";
            slots[i].style.background = "rgba(34, 197, 94, 0.2)";
        }
    }
}

// ---------- victory ----------

function handleVictory() {
    stopTimer();
    stopFloorTimer();
    recordGameResult(true, 11);
    showReceipt();
}

function showReceipt() {
    stopTimer();
    stopFloorTimer();

    const victoryTimeDisplay = document.getElementById("victory-time-display");
    const badgeDisplay = document.getElementById("receipt-badge-display");
    const dateDisplay = document.getElementById("receipt-date-display");
    const runSummaryDisplay = document.getElementById("victory-run-summary-display");

    const hudContainer = document.getElementById("floor-hud-container");
    const gameWorkspace = document.getElementById("game-workspace");
    const gameControls = document.getElementById("game-controls");
    const gameplayHeader = document.getElementById("gameplay-header");
    const activeGameTimer = document.getElementById("active-game-timer");
    const victoryScreen = document.getElementById("victory-screen");
    const footerText = document.getElementById("footer-text");

    if (victoryTimeDisplay) victoryTimeDisplay.textContent = formatTime(timeElapsedSeconds);
    if (dateDisplay) dateDisplay.textContent = getFormattedDateString();

    // v0.5: attempt line reads "on 1st attempt", "on 2nd attempt", ...
    if (badgeDisplay) badgeDisplay.textContent = `on ${ordinal(attemptsToday)} attempt`;

    // v0.5: Accuracy. Green 10/10 = no wrong word all session.
    // Otherwise red = floor of the first wrong word, green 10.
    if (runSummaryDisplay) {
        const left = firstWrongFloor === null ? "10" : String(firstWrongFloor);
        const leftColour = firstWrongFloor === null ? "var(--state-success)" : "var(--state-error)";
        runSummaryDisplay.innerHTML = `<span style="color: ${leftColour};">${left}</span><span style="color: var(--text-muted);">/</span><span style="color: var(--state-success);">10</span>`;
    }

    if (hudContainer) hudContainer.style.display = "none";
    if (gameWorkspace) gameWorkspace.style.display = "none";
    if (gameControls) gameControls.style.display = "none";
    if (gameplayHeader) gameplayHeader.style.display = "none";
    if (activeGameTimer) activeGameTimer.style.display = "none";
    if (footerText) footerText.style.display = "none";

    triggerHaptic([50, 50, 50, 50, 100]);
    if (victoryScreen) victoryScreen.style.display = "flex";
}

function showMessage(text, isError = false) {
    const msg = document.getElementById("message-box");
    if (msg) {
        msg.textContent = text;
        msg.style.color = isError ? "#EF4444" : "#22c55e";
    }
}

// ---------- debug (v0.5) ----------

// Test shortcuts. Nothing is saved to real stats. REMOVE OR LOCK BEFORE LAUNCH.
//   word-climb page ?debug=win&attempt=3&fail=4&time=92   victory screen straight away
//   word-climb page ?debug=ride&attempt=1&time=92         the victory lift ride, then the receipt
//   word-climb page ?debug=floor&n=10                     start on floor 10 (no lift, clock running)
// attempt = which attempt it was, fail = floor of first wrong word (omit for clean run),
// time = seconds, n = floor number 1 to 10.
async function runDebugSwitch() {
    let params;
    try {
        params = new URLSearchParams(window.location.search);
    } catch (e) {
        return;
    }
    const mode = params.get("debug");
    if (mode !== "win" && mode !== "ride" && mode !== "floor") return;

    debugMode = true;
    const attempt = parseInt(params.get("attempt"), 10);
    const fail = parseInt(params.get("fail"), 10);
    const time = parseInt(params.get("time"), 10);
    const n = parseInt(params.get("n"), 10);

    attemptsToday = attempt > 0 ? attempt : 1;
    firstWrongFloor = fail >= 1 && fail <= 10 ? fail : null;
    timeElapsedSeconds = time >= 0 ? time : 92;

    initDailyPuzzle();
    wheelLetters = [...initialDailyWheel];
    setRulesButtonVisible(false);

    if (mode === "win") {
        const startScreen = document.getElementById("start-screen");
        if (startScreen) startScreen.style.display = "none";
        showReceipt();
    } else if (mode === "ride") {
        showGameChrome();
        isTransitioning = true;
        playLiftRide(LIFT_VICTORY_MS, () => showReceipt(), { victory: true });
    } else {
        const ok = await resolveDictionary();
        validWordSet = ok ? validWordSet : INTERNAL_FALLBACK_WORDS; // debug only
        showGameChrome();
        usedWords = new Set();
        startTimer();
        setupFloor(n >= 1 && n <= 10 ? n : 1);
    }
}

// ---------- player stats & persistence ----------

// v0.5: failType is "wrong" or "timeout" for falls, ignored for wins
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
        stats.fallsByFloor[key][failType === "timeout" ? "timeout" : "wrong"]++;
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
        if (!merged.fallsByFloor || typeof merged.fallsByFloor !== "object") merged.fallsByFloor = {};
        return merged;
    } catch (e) {
        return defaultStats();
    }
}

function updateStatsDisplay() {
    const stats = getStats();
    const playedElem = document.getElementById("stat-played");
    const winsElem = document.getElementById("stat-wins");
    const winrateElem = document.getElementById("stat-winrate");
    const streakElem = document.getElementById("stat-streak");
    const bestfloorElem = document.getElementById("stat-bestfloor");
    const besttimeElem = document.getElementById("stat-besttime");
    const fallsElem = document.getElementById("stat-falls");

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

    // v0.5: falls by floor (wrong word or timeout)
    if (fallsElem) {
        const by = stats.fallsByFloor || {};
        const floors = Object.keys(by).map(Number).sort((a, b) => a - b);
        if (floors.length === 0) {
            fallsElem.innerHTML = "";
            fallsElem.style.display = "none";
        } else {
            fallsElem.style.display = "block";
            fallsElem.innerHTML = '<div class="falls-title">Falls by floor</div>' + floors.map(f => {
                const rec = by[f] || {};
                const parts = [];
                if (rec.wrong) parts.push(`${rec.wrong} wrong`);
                if (rec.timeout) parts.push(`${rec.timeout} timeout`);
                return `<div class="falls-row"><span>${ordinal(f)} Floor</span><span>${parts.join(" · ")}</span></div>`;
            }).join("");
        }
    }
}
