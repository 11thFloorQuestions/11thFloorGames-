/**
 * 11th Floor Games: shared demo controller (Gaffer / Host / Branded demos)
 * Three entrances (solo / host / group), per-mode receipts, per-question recording.
 * Lift ride: same as TYKB. Plays after every answer, right or wrong. Final ride is gold and leads to the receipt.
 */

// ---- Config ---------------------------------------------------------------
const SHUFFLE_OPTIONS = true;           // answer choices are shuffled on every question (correct answer is found by its text, so order does not matter)
const GAME_ID = (window.demoConfig && window.demoConfig.id) || 'demo';

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

const CFG = window.demoConfig || {};
const HOST_NAME = CFG.hostName || 'Quiz Host';
const MODE_LABELS = { solo: 'SOLO', host: HOST_NAME.toUpperCase(), group: 'GROUP' };
const MODE_BADGES = { solo: 'SOLO PLAYER', host: HOST_NAME.toUpperCase(), group: 'GROUP PLAYER' };

function rulesFor(mode) {
    const n = getQuestions().length;
    const all = {
        solo: { title: 'HOW SOLO WORKS', body: [
            `<strong>Race the clock.</strong> Answer all ${n} questions. Your score is out of ${n} and your time is the tie-break, so be right and be quick.`,
            'One attempt per question, no going back. Your Victory Receipt shows your score first, then your time.'] },
        host: { title: `HOW ${HOST_NAME.toUpperCase()} MODE WORKS`, body: [
            `<strong>You are the Quiz Master.</strong> Read each question aloud to your friends, group, stream or pub. Tap Reveal ${HOST_NAME} Fact for hints and banter.`,
            `Play through all ${n} questions. Your total run time is the host time, and it is the headline on your Victory Receipt.`,
            'Gather your players\u2019 scores and share your receipt.'] },
        group: { title: 'HOW GROUP PLAY WORKS', body: [
            `<strong>Listen to your ${HOST_NAME}.</strong> The question is masked on your screen but the answers stay. Lock in your answer as the host reads each question.`,
            `Your Victory Receipt shows your score out of ${n} and your own time.`] }
    };
    return all[mode] || all.solo;
}

// ---- Questions come from the data file as rows:
// [question, right answer, wrong 1, wrong 2, wrong 3, host note]. Wrong 2 and 3 may be left "".
// Bad data shows a plain message and stops the game. It never quietly plays a placeholder.
let DATA_PROBLEMS = [];
function loadQuestions() {
    const rows = window.demoQuestions, problems = [], out = [];
    const clean = x => (typeof x === 'string' ? x.trim() : (typeof x === 'number' ? String(x) : ''));
    if (!Array.isArray(rows)) problems.push('The questions file did not load. Look for a missing comma, bracket or quote in it, then reload.');
    else if (!rows.length) problems.push('The questions file has no questions in it.');
    else rows.forEach((r, i) => {
        const n = i + 1;
        if (!Array.isArray(r)) { problems.push(`Question ${n}: each question must be one row in square brackets.`); return; }
        const q = clean(r[0]), right = clean(r[1]), wrong = [r[2], r[3], r[4]].map(clean).filter(Boolean);
        if (!q) { problems.push(`Question ${n}: the question text is missing.`); return; }
        if (!right) { problems.push(`Question ${n}: the right answer is missing.`); return; }
        if (!wrong.length) { problems.push(`Question ${n}: it needs at least one wrong answer.`); return; }
        const opts = [right].concat(wrong), low = opts.map(o => o.toLowerCase());
        if (new Set(low).size !== low.length) { problems.push(`Question ${n}: two of the answers are the same.`); return; }
        out.push({ question: q, options: opts, answer: right, fact: clean(r[5]) });
    });
    DATA_PROBLEMS = problems;
    return problems.length ? [] : out;
}
const QUESTIONS = loadQuestions();
function getQuestions() { return QUESTIONS; }

function showDataProblems() {
    const box = document.createElement('div');
    box.style.cssText = 'width:100%;max-width:420px;margin:10px 0;padding:12px 14px;border:1px solid var(--state-error);border-radius:8px;background:rgba(211,47,47,.1);font-size:.75rem;line-height:1.4;text-align:left';
    const h = document.createElement('strong'); h.textContent = 'This quiz cannot start. Fix the questions file:'; box.appendChild(h);
    DATA_PROBLEMS.slice(0, 5).forEach(p => { const d = document.createElement('div'); d.textContent = '\u2022 ' + p; d.style.marginTop = '4px'; box.appendChild(d); });
    if (DATA_PROBLEMS.length > 5) { const d = document.createElement('div'); d.textContent = `...and ${DATA_PROBLEMS.length - 5} more.`; box.appendChild(d); }
    const land = $('landing-screen'); land.insertBefore(box, land.children[1] || null);
    document.querySelectorAll('.btn-start,.rules-pill-btn').forEach(b => { b.disabled = true; b.style.opacity = '.4'; b.style.pointerEvents = 'none'; });
}

// ---- Branding: everything a host can change lives in the data file's demoConfig
function applyDemoConfig() {
    const set = (sel, txt) => { const el = document.querySelector(sel); if (el && txt) el.textContent = txt; };
    if (/^#[0-9a-f]{6}$/i.test(CFG.accent || '')) {
        const h = CFG.accent.slice(1), s = document.documentElement.style;
        s.setProperty('--genre-gold', CFG.accent); s.setProperty('--state-active', CFG.accent);
        s.setProperty('--accent-rgb', [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)).join(','));
    }
    if (CFG.title) document.title = `${CFG.title} (Demo)`;
    set('#landing-screen .game-logo-pitch', CFG.title);
    set('#landing-screen .game-logo-title', CFG.kicker);
    set('#landing-screen .game-logo-sub', CFG.sub);
    set('#gameplay-header .game-logo-title', CFG.kicker);
    set('#gameplay-header .game-logo-sub', CFG.title);
    set('.mode-card.host .card-name', `${HOST_NAME} Mode`);
    set('.mode-card.host .rules-pill-btn', `How ${HOST_NAME} mode works`);
    set('.mode-card.host .btn-start', `Start as ${HOST_NAME}`);
    set('#btn-reveal-fact', `Reveal ${HOST_NAME} fact`);
    set('#host-fact-box span', `${HOST_NAME.toUpperCase()} FACT:`);
    set('.brand-title-bottom', 'DEMO');
    set('.badge-slot-reserved', CFG.badge || 'Demo');
    set('.game-title-header', CFG.receiptTitle || CFG.title);
    set('.flex-status-label .brand-gold', CFG.title);
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
    applyDemoConfig();
    if (DATA_PROBLEMS.length) showDataProblems();
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
        $('question-text').innerText = 'QUESTION MASKED \u2014 LISTEN TO YOUR ' + HOST_NAME.toUpperCase() + '!';
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
            const file = new File([blob], GAME_ID + '-victory.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try { await navigator.share({ title: (CFG.title || 'Quiz') + ' Victory Receipt (Demo)', files: [file] }); } catch (e) {}
            } else {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(file);
                a.download = GAME_ID + '-victory.png';
                a.click();
            }
        }, 'image/png');
    } catch (err) {
        toast.style.display = 'none';
        console.error('Screenshot failed:', err);
    }
}

window.resetAndPlayAgain = function () { location.reload(); };
// END OF FILE: demo.js
