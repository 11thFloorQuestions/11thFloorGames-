let currentFloor = 0;
let selectedMode = 'solo'; // 'solo', 'gaffa', 'group'
let startTime = 0;
let timerInterval = null;
let timeElapsedSeconds = 0;
let soundEnabled = true;
let correctCount = 0;
let dailyAttempts = 1;

window.addEventListener('DOMContentLoaded', () => {
    try {
        const storedAttempts = localStorage.getItem('tyk_545_attempts_count');
        if (storedAttempts) {
            dailyAttempts = parseInt(storedAttempts, 10) || 1;
        }
    } catch (e) {
        dailyAttempts = 1;
    }

    try {
        const savedState = localStorage.getItem('skyscraper_progress');
        if (savedState) {
            const data = JSON.parse(savedState);
            if (typeof data.floor === 'number' && data.floor < fullQuestions.length) {
                const btnResume = document.getElementById('btn-resume-skyscraper');
                if (btnResume) btnResume.style.display = 'block';
            } else {
                localStorage.removeItem('skyscraper_progress');
            }
        }
    } catch (e) {
        console.warn('LocalStorage structure reset:', e);
        localStorage.removeItem('skyscraper_progress');
    }

    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const victoryCard = document.getElementById('victory-card');
            const toast = document.getElementById('toast-msg');
            
            if (toast) {
                toast.innerText = 'CAPTURING SCREENSHOT...';
                toast.style.display = 'block';
            }

            if (victoryCard) {
                try {
                    const canvas = await html2canvas(victoryCard, { backgroundColor: '#111111', scale: 2 });
                    canvas.toBlob(async (blob) => {
                        if (toast) toast.style.display = 'none';
                        if (!blob) return;
                        const file = new File([blob], 'tykball-545-victory.png', { type: 'image/png' });

                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                            try {
                                await navigator.share({ title: 'TYKB 5.45 Special Victory Card', files: [file] });
                            } catch (e) {}
                        } else {
                            const a = document.createElement('a');
                            a.href = URL.createObjectURL(file);
                            a.download = 'tykball-545-victory.png';
                            a.click();
                        }
                    }, 'image/png');
                } catch (err) {
                    if (toast) toast.style.display = 'none';
                    console.error('Screenshot failed:', err);
                }
            }
        });
    }
});

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('btn-sound-toggle');
    if (btn) btn.innerText = `SOUND: ${soundEnabled ? 'ON' : 'OFF'}`;
}

function selectMode(mode, btnEl) {
    selectedMode = mode;
    document.querySelectorAll('.mode-option-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
}

function startSkyscraperGame() {
    localStorage.removeItem('skyscraper_progress');
    currentFloor = 0;
    timeElapsedSeconds = 0;
    correctCount = 0;

    dailyAttempts++;
    try {
        localStorage.setItem('tyk_545_attempts_count', dailyAttempts.toString());
    } catch (e) {}

    initGameSession();
}

function resumeSkyscraperGame() {
    try {
        const savedState = localStorage.getItem('skyscraper_progress');
        if (savedState) {
            const data = JSON.parse(savedState);
            currentFloor = data.floor || 0;
            timeElapsedSeconds = data.time || 0;
            selectedMode = data.mode || 'solo';
            correctCount = data.score || 0;
            initGameSession(true);
        } else {
            startSkyscraperGame();
        }
    } catch (e) {
        localStorage.removeItem('skyscraper_progress');
        startSkyscraperGame();
    }
}

function initGameSession(isResume = false) {
    const landing = document.getElementById('landing-screen');
    const header = document.getElementById('gameplay-header');
    const hud = document.getElementById('floor-hud-container');
    const workspace = document.getElementById('game-workspace');

    if (landing) landing.style.display = 'none';
    if (header) header.style.display = 'flex';
    if (hud) hud.style.display = 'flex';
    if (workspace) workspace.style.display = 'flex';

    if (!isResume) {
        timeElapsedSeconds = 0;
    }
    
    startTime = Date.now() - (timeElapsedSeconds * 1000);
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const m = Math.floor(timeElapsedSeconds / 60).toString().padStart(2, '0');
        const s = (timeElapsedSeconds % 60).toString().padStart(2, '0');
        
        const activeTimer = document.getElementById('active-game-timer');
        if (activeTimer) activeTimer.textContent = `${m}:${s}`;
        
        try {
            localStorage.setItem('skyscraper_progress', JSON.stringify({
                floor: currentFloor,
                time: timeElapsedSeconds,
                mode: selectedMode,
                score: correctCount
            }));
        } catch (e) {
            console.warn('LocalStorage write failed:', e);
        }
    }, 1000);

    renderFloor();
}

function toggleGafferFact() {
    const box = document.getElementById('gaffer-fact-box');
    const btn = document.getElementById('btn-reveal-fact');
    if (box && btn) {
        if (box.style.display === 'block') {
            box.style.display = 'none';
            btn.textContent = 'REVEAL GAFFA FACT';
        } else {
            box.style.display = 'block';
            btn.textContent = 'HIDE GAFFA FACT';
        }
    }
}

function renderFloor() {
    if (currentFloor >= fullQuestions.length) {
        handleVictory();
        return;
    }

    const q = fullQuestions[currentFloor];
    const qBox = document.getElementById('question-box');
    const qText = document.getElementById('question-text');
    const gafferBox = document.getElementById('gaffer-fact-box');
    const gafferText = document.getElementById('gaffer-fact-text');
    const revealBtn = document.getElementById('btn-reveal-fact');
    const floorText = document.getElementById('card-floor-text');
    const modeBadge = document.getElementById('mode-badge-text');
    
    if (floorText) floorText.innerHTML = `<span style="color: var(--genre-pitch);">Q${q.floor}</span> / ${fullQuestions.length}`;
    if (modeBadge) modeBadge.textContent = `MODE: ${selectedMode.toUpperCase()}`;

    if (selectedMode === 'group') {
        if (qBox) qBox.classList.add('masked');
        if (qText) qText.innerHTML = `<span style="color: var(--genre-pitch); font-style: italic;">QUESTION MASKED<br><small style="color: var(--text-muted); font-size: 0.65rem;">LISTEN TO YOUR GAFFA READ ALOUD</small></span>`;
        if (revealBtn) revealBtn.style.display = 'none';
        if (gafferBox) gafferBox.style.display = 'none';
    } else if (selectedMode === 'gaffa') {
        if (qBox) qBox.classList.remove('masked');
        if (qText) qText.textContent = q.question;
        if (revealBtn) {
            revealBtn.style.display = 'block';
            revealBtn.textContent = 'REVEAL GAFFA FACT';
        }
        if (gafferBox) gafferBox.style.display = 'none';
        if (gafferText) gafferText.textContent = q.explanation;
    } else {
        if (qBox) qBox.classList.remove('masked');
        if (qText) qText.textContent = q.question;
        if (revealBtn) revealBtn.style.display = 'none';
        if (gafferBox) gafferBox.style.display = 'none';
    }

    const grid = document.getElementById('options-grid');
    if (grid) {
        grid.innerHTML = '';
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.textContent = opt;
            btn.onclick = () => selectAnswer(opt === q.answer, btn);
            grid.appendChild(btn);
        });
    }
}

function selectAnswer(isCorrect, btnEl) {
    document.querySelectorAll('.btn-option').forEach(b => b.disabled = true);

    if (isCorrect) {
        correctCount++;
        if (btnEl) btnEl.classList.add('selected-correct');
    } else {
        if (btnEl) btnEl.classList.add('selected-wrong');
    }

    setTimeout(() => {
        currentFloor++;
        renderFloor();
    }, 400);
}

function handleVictory() {
    clearInterval(timerInterval);
    localStorage.removeItem('skyscraper_progress');

    const workspace = document.getElementById('game-workspace');
    const hud = document.getElementById('floor-hud-container');
    const header = document.getElementById('gameplay-header');
    const victory = document.getElementById('victory-screen');

    if (workspace) workspace.style.display = 'none';
    if (hud) hud.style.display = 'none';
    if (header) header.style.display = 'none';
    if (victory) victory.style.display = 'flex';

    const m = Math.floor(timeElapsedSeconds / 60).toString().padStart(2, '0');
    const s = (timeElapsedSeconds % 60).toString().padStart(2, '0');
    const formattedTime = `${m}:${s}`;

    const timeDisplay = document.getElementById('victory-time-display');
    const timeRowDisplay = document.getElementById('victory-time-row-display');
    const modeBadge = document.getElementById('victory-mode-badge');
    const scoreText = document.getElementById('accuracy-text');
    const attemptsNoticeVal = document.getElementById('attempts-notice-val');

    if (timeDisplay) timeDisplay.textContent = formattedTime;
    if (timeRowDisplay) timeRowDisplay.textContent = `${formattedTime}s`;
    
    if (selectedMode === 'group') {
        if (modeBadge) modeBadge.textContent = 'GROUP PLAYER';
    } else if (selectedMode === 'gaffa') {
        if (modeBadge) modeBadge.textContent = 'GAFFA MASTER';
    } else {
        if (modeBadge) modeBadge.textContent = 'SOLO MASTER';
    }

    if (attemptsNoticeVal) attemptsNoticeVal.textContent = dailyAttempts;
    if (scoreText) scoreText.textContent = `${correctCount}/${fullQuestions.length}`;
}

function resetAndPlayAgain() {
    localStorage.removeItem('skyscraper_progress');
    location.reload();
}
<!-- END OF FILE: 545-special.js -->
