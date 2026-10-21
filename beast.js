/**
 * 11th Floor Questions: The Beast — controller
 * Three entrances (solo / host / group), per-mode receipts, per-question recording.
 * Lift ride: same as TYKB. Plays after every answer, right or wrong. Final ride is gold and leads to the receipt.
 */

// ---- Config ---------------------------------------------------------------
const SHUFFLE_OPTIONS = true;           // answer choices are shuffled on every question (correct answer is found by its text, so order does not matter)
const GAME_ID = 'beast';

// Lift ride timings (ms). Same values as TYKB.
const LIFT_OPENING_MS = 1400;           // first ride, before question 1
const LIFT_RISE_MS = 1000;              // ride between questions
const LIFT_VICTORY_MS = 2000;           // final green ride to the receipt
const LIFT_ANSWER_DELAY_MS = 400;       // pause after an answer before the ride starts

// ---- State ----------------------------------------------------------------
let currentIndex = 0;
let selectedMode = 'solo';
let startTime = 0;
let timerInterval = null;
let timeElapsedSeconds = 0;
let soundEnabled = true;
let correctCount = 0;
let isAnswering = false;
let answerLog = [];                      // { q, picked, correct, right, t }

const MODE_LABELS = { solo: 'SOLO', host: 'QUIZ HOST', group: 'GROUP' };
const MODE_BADGES = { solo: 'SOLO PLAYER', host: 'QUIZ HOST', group: 'GROUP PLAYER' };

function rulesFor(mode) {
    const n = getQuestions().length;
    const all = {
        solo: {
            title: 'HOW SOLO WORKS',
            body: [
                `<strong>Race the clock.</strong> Answer all ${n} questions. Your score is out of ${n} and your time is the tie-break, so be right and be quick.`,
                'One attempt per question, no going back. Your Victory Receipt shows your score first, then your time.'
            ]
        },
        host: {
            title: 'HOW HOST MODE WORKS',
            body: [
                '<strong>You are the Quiz Master.</strong> Read each question aloud to your friends, group, stream or pub. Tap Reveal Host Fact for hints and banter.',
                `Play through all ${n} questions. Your total run time is the host time, and it is the headline on your Victory Receipt.`,
                'Gather your players\u2019 scores and share your receipt.'
            ]
        },
        group: {
            title: 'HOW GROUP PLAY WORKS',
            body: [
                '<strong>Listen to your Quiz Host.</strong> The question is masked on your screen but the four answers stay. Lock in your answer as the host reads each question.',
                `Your Victory Receipt shows your score out of ${n} and your own time.`
            ]
        }
    };
    return all[mode] || all.solo;
}

const fallbackQuestions = [
    { question: 'Placeholder: which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter', 'Mercury'], answer: 'Mars', explanation: 'Placeholder.' }
];

function getQuestions() {
    if (typeof window.beastQuestions !== 'undefined' && Array.isArray(window.beastQuestions) && window.beastQuestions.length) return window.beastQuestions;
    if (typeof fullQuestions !== 'undefined' && Array.isArray(fullQuestions) && fullQuestions.length) return fullQuestions;
    return fallbackQuestions;
}

// ---- Edition label (date based, UK time) ------------------------------------
function ukDateParts() {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', day: '2-digit', month: 'short', year: 'numeric' });
    const p = {};
    fmt.formatToParts(new Date()).forEach(x => { p[x.type] = x.value; });
    return p;
}
function editionKey() { const p = ukDateParts(); return `${p.year}-${p.month}-${p.day}`; }   // e.g. 2026-Oct-20
function editionLabel() { const p = ukDateParts(); return `${parseInt(p.day, 10)} ${p.month.toUpperCase()}`; } // e.g. 20 OCT

let EDITION = editionKey();              // fixed when a game starts, so a midnight finish keeps its edition
const progressKey = () => `${GAME_ID}_progress_${EDITION}`;
const attemptsKey = () => `${GAME_ID}_attempts_${EDITION}`;
const logKey = () => `${GAME_ID}_log`;

// ---- Helpers ----------------------------------------------------------------
const $ = id => document.getElementById(id);
const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

// ---- Landing ----------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    const soloDesc = $('solo-desc');
    if (soloDesc) soloDesc.innerText = `${getQuestions().length} questions \u00b7 race the clock`;

    try {
        const saved = JSON.parse(lsGet(progressKey()) || 'null');
        if (saved && typeof saved.index === 'number' && saved.index < getQuestions().length && MODE_LABELS[saved.mode]) {
            const btn = $('resume-' + saved.mode);          // resume appears only on the mode in progress
            if (btn) btn.style.display = 'block';
        } else if (saved) {
            lsDel(progressKey());
        }
    } catch (e) { lsDel(progressKey()); }

    $('share-btn').addEventListener('click', shareReceipt);
});

window.toggleSound = function () {
    soundEnabled = !soundEnabled;
    $('btn-sound-toggle').innerText = soundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
};

window.openRulesModal = function (mode) {
    const r = rulesFor(mode);
    $('rules-title').innerText = r.title;
    $('rules-body').innerHTML = r.body.map(t => `<p>${t}</p>`).join('');
    $('rules-modal').style.display = 'flex';
};
window.closeRulesModal = function () { $('rules-modal').style.display = 'none'; };

// ---- Start / resume ---------------------------------------------------------
window.startGame = function (mode) {
    selectedMode = mode;
    EDITION = editionKey();
    currentIndex = 0; correctCount = 0; timeElapsedSeconds = 0; answerLog = [];
    initWorkspace();
};

window.resumeGame = function (mode) {
    try {
        const d = JSON.parse(lsGet(progressKey()) || 'null');
        if (d) {
            selectedMode = d.mode || mode;
            currentIndex = d.index || 0;
            correctCount = d.correct || 0;
            timeElapsedSeconds = d.time || 0;
            answerLog = Array.isArray(d.log) ? d.log : [];
        }
    } catch (e) { return window.startGame(mode); }
    initWorkspace();
};

function initWorkspace() {
    $('landing-screen').style.display = 'none';
    $('victory-screen').style.display = 'none';
    $('gameplay-header').style.display = 'flex';
    $('floor-hud-container').style.display = 'flex';
    $('game-workspace').style.display = 'flex';
    $('mode-badge-text').innerText = `MODE: ${MODE_LABELS[selectedMode]}`;

    // Build the first question now, hidden under the lift, so the game card is its full height
    // and the lift is full size from the very first ride. The clock starts when the lift arrives.
    renderQuestion();
    playLiftRide(LIFT_OPENING_MS, () => {
        startTimer();
    });
}

function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now() - timeElapsedSeconds * 1000;
    timerInterval = setInterval(() => {
        timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        $('active-game-timer').innerText = fmtTime(timeElapsedSeconds);
    }, 1000);
}

// ---- Lift ride (same as TYKB) -----------------------------------------------
let liftRideToken = 0;

function playLiftRide(durationMs, onArrive, options) {
    const overlay = $('lift-overlay');
    const graphic = $('lift-graphic');

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

// ---- Questions --------------------------------------------------------------
function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}

function renderQuestion() {
    const list = getQuestions();
    if (currentIndex >= list.length) { finishGame(); return; }

    isAnswering = false;
    const q = list[currentIndex];
    const qBox = $('question-box'), btnFact = $('btn-reveal-fact');

    $('card-floor-text').innerHTML = `<span style="color:var(--genre-gold)">Q${currentIndex + 1}</span> / ${list.length}`;
    $('host-fact-box').style.display = 'none';

    if (selectedMode === 'group') {
        $('question-text').innerText = 'QUESTION MASKED \u2014 LISTEN TO YOUR QUIZ HOST!';
        qBox.classList.add('masked');
        btnFact.style.display = 'none';
    } else {
        $('question-text').innerText = q.question;
        qBox.classList.remove('masked');
        if (selectedMode === 'host') {
            btnFact.style.display = 'block';
            $('host-fact-text').innerText = q.fact || 'No host note for this question.';
        } else {
            btnFact.style.display = 'none';
        }
    }

    // Work out the correct answer by text, then (optionally) shuffle the options
    const correctText = typeof q.answer === 'string'
        ? q.answer
        : (q.options[[q.correct, q.correctIndex, q.answer].find(n => typeof n === 'number')] ?? q.options[0]);
    const opts = SHUFFLE_OPTIONS ? shuffled(q.options) : q.options.slice();
    const correctIndex = opts.findIndex(o => o.trim().toLowerCase() === String(correctText).trim().toLowerCase());

    const grid = $('options-grid');
    grid.innerHTML = '';
    opts.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(idx, correctIndex, btn, opts, q);
        grid.appendChild(btn);
    });

    saveProgress();
}

window.toggleHostFact = function () {
    const b = $('host-fact-box');
    b.style.display = b.style.display === 'block' ? 'none' : 'block';
};

function handleAnswer(selectedIndex, correctIndex, btn, opts, q) {
    if (isAnswering) return;
    isAnswering = true;

    const right = selectedIndex === correctIndex;
    btn.classList.add(right ? 'selected-correct' : 'selected-wrong');
    if (right) correctCount++;

    answerLog.push({ q: currentIndex + 1, picked: opts[selectedIndex], correct: opts[correctIndex], right, t: timeElapsedSeconds });

    // Right or wrong, the lift takes them on. The last question gets the green ride to the receipt.
    const isLast = currentIndex >= getQuestions().length - 1;
    setTimeout(() => {
        playLiftRide(isLast ? LIFT_VICTORY_MS : LIFT_RISE_MS, () => {
            currentIndex++;
            renderQuestion();           // past the last question this calls finishGame()
        }, { victory: isLast });
    }, LIFT_ANSWER_DELAY_MS);
}

function saveProgress() {
    lsSet(progressKey(), JSON.stringify({ index: currentIndex, correct: correctCount, time: timeElapsedSeconds, mode: selectedMode, log: answerLog }));
}

// ---- Finish + receipts ------------------------------------------------------
function finishGame() {
    clearInterval(timerInterval);
    lsDel(progressKey());

    const attempt = (parseInt(lsGet(attemptsKey()), 10) || 0) + 1;   // first completion = attempt 1
    lsSet(attemptsKey(), String(attempt));

    const total = getQuestions().length;
    const time = fmtTime(timeElapsedSeconds);

    // Record the run for the future stats window
    try {
        const log = JSON.parse(lsGet(logKey()) || '[]');
        log.push({ edition: EDITION, mode: selectedMode, attempt, score: correctCount, total, seconds: timeElapsedSeconds, answers: answerLog });
        lsSet(logKey(), JSON.stringify(log.slice(-50)));
    } catch (e) {}

    $('gameplay-header').style.display = 'none';
    $('floor-hud-container').style.display = 'none';
    $('game-workspace').style.display = 'none';
    $('victory-screen').style.display = 'flex';

    $('receipt-edition').innerText = editionLabel();
    $('victory-mode-badge').innerText = MODE_BADGES[selectedMode] || 'PLAYER';

    const score = `${correctCount}/${total}`;
    const rows = [];

    if (selectedMode === 'host') {
        // Host: run time is the hero
        $('hero-label').innerText = 'HOST TIME';
        $('hero-value').innerHTML = `${time}<small>s</small>`;
        rows.push(['SCORE', score, 'success'], ['ATTEMPT', attempt, 'active']);
    } else if (selectedMode === 'group') {
        // Group: score is the hero, own time below
        $('hero-label').innerText = 'YOUR SCORE';
        $('hero-value').innerText = score;
        rows.push(['TIME', `${time}s`, 'active'], ['ATTEMPT', attempt, 'active']);
    } else {
        // Solo: score is the hero, time breaks ties
        $('hero-label').innerText = 'SCORE';
        $('hero-value').innerText = score;
        rows.push(['TIME', `${time}s`, 'active'], ['ATTEMPT', attempt, 'active']);
    }

    $('receipt-rows').innerHTML = rows.map(r =>
        `<div class="receipt-row"><span class="row-label">${r[0]}</span><span class="row-val ${r[2]}">${r[1]}</span></div>`).join('');
}

async function shareReceipt() {
    const card = $('victory-card'), toast = $('toast-msg');
    toast.innerText = 'CAPTURING SCREENSHOT...';
    toast.style.display = 'block';
    if (!card || typeof html2canvas === 'undefined') { toast.style.display = 'none'; return; }
    try {
        const canvas = await html2canvas(card, { backgroundColor: '#111111', scale: 2 });
        canvas.toBlob(async blob => {
            toast.style.display = 'none';
            if (!blob) return;
            const file = new File([blob], 'beast-victory.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try { await navigator.share({ title: 'The Beast Victory Receipt', files: [file] }); } catch (e) {}
            } else {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(file);
                a.download = 'beast-victory.png';
                a.click();
            }
        }, 'image/png');
    } catch (err) {
        toast.style.display = 'none';
        console.error('Screenshot failed:', err);
    }
}

window.resetAndPlayAgain = function () { location.reload(); };
// END OF FILE: beast.js
