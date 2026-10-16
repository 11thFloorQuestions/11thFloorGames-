/**
 * Think You Know Ball? 5.45 Special
 * Application Logic & Controller
 */

let currentFloor = 0;
let selectedMode = 'solo';
let startTime = 0;
let timerInterval = null;
let timeElapsedSeconds = 0;
let soundEnabled = true;
let correctCount = 0;
let dailyAttempts = 1;
let isAnswering = false;

const fallbackQuestions = [
    {
        question: "Which club won the inaugural English Premier League title in 1992-93?",
        options: ["Manchester United", "Aston Villa", "Blackburn Rovers", "Norwich City"],
        answer: "Manchester United",
        explanation: "Manchester United won by 10 clear points ahead of Aston Villa."
    },
    {
        question: "Who holds the record for the most Premier League goals scored in a single 38-game season?",
        options: ["Alan Shearer", "Erling Haaland", "Mohamed Salah", "Cristiano Ronaldo"],
        answer: "Erling Haaland",
        explanation: "Erling Haaland scored 36 goals in his debut 2022-23 Premier League season."
    }
];

function getQuestions() {
    if (typeof window.specialQuizQuestions !== 'undefined' && Array.isArray(window.specialQuizQuestions) && window.specialQuizQuestions.length > 0) {
        return window.specialQuizQuestions;
    }
    if (typeof fullQuestions !== 'undefined' && Array.isArray(fullQuestions) && fullQuestions.length > 0) {
        return fullQuestions;
    }
    if (typeof questions !== 'undefined' && Array.isArray(questions) && questions.length > 0) {
        return questions;
    }
    return fallbackQuestions;
}

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
            const questionsList = getQuestions();
            if (typeof data.floor === 'number' && data.floor < questionsList.length) {
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

            if (victoryCard && typeof html2canvas !== 'undefined') {
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
            } else if (toast) {
                toast.style.display = 'none';
            }
        });
    }
});

window.toggleSound = function() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('btn-sound-toggle');
    if (btn) {
        btn.innerText = soundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
    }
};

window.openRulesModal = function() {
    const modal = document.getElementById('rules-modal');
    if (modal) modal.style.display = 'flex';
};

window.closeRulesModal = function() {
    const modal = document.getElementById('rules-modal');
    if (modal) modal.style.display = 'none';
};

window.selectMode = function(mode, element) {
    selectedMode = mode;
    const buttons = document.querySelectorAll('.mode-option-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
};

window.startSkyscraperGame = function() {
    currentFloor = 0;
    correctCount = 0;
    timeElapsedSeconds = 0;
    initGameWorkspace();
};

window.resumeSkyscraperGame = function() {
    try {
        const savedState = localStorage.getItem('skyscraper_progress');
        if (savedState) {
            const data = JSON.parse(savedState);
            currentFloor = data.floor || 0;
            correctCount = data.correct || 0;
            timeElapsedSeconds = data.time || 0;
            selectedMode = data.mode || 'solo';
        }
    } catch (e) {
        currentFloor = 0;
        correctCount = 0;
        timeElapsedSeconds = 0;
    }
    initGameWorkspace();
};

function initGameWorkspace() {
    const landing = document.getElementById('landing-screen');
    const header = document.getElementById('gameplay-header');
    const floorHud = document.getElementById('floor-hud-container');
    const workspace = document.getElementById('game-workspace');
    const victory = document.getElementById('victory-screen');

    if (landing) landing.style.display = 'none';
    if (victory) victory.style.display = 'none';
    if (header) header.style.display = 'flex';
    if (floorHud) floorHud.style.display = 'flex';
    if (workspace) workspace.style.display = 'flex';

    const modeText = document.getElementById('mode-badge-text');
    if (modeText) {
        modeText.innerText = `MODE: ${selectedMode.toUpperCase()}`;
    }

    startTimer();
    renderCurrentQuestion();
}

function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now() - (timeElapsedSeconds * 1000);
    timerInterval = setInterval(() => {
        timeElapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const timerElem = document.getElementById('active-game-timer');
        if (timerElem) {
            const mins = String(Math.floor(timeElapsedSeconds / 60)).padStart(2, '0');
            const secs = String(timeElapsedSeconds % 60).padStart(2, '0');
            timerElem.innerText = `${mins}:${secs}`;
        }
    }, 1000);
}

function renderCurrentQuestion() {
    const questionsList = getQuestions();
    
    if (currentFloor >= questionsList.length) {
        finishGame();
        return;
    }

    isAnswering = false;
    const q = questionsList[currentFloor];
    const qTextElem = document.getElementById('question-text');
    const qBoxElem = document.getElementById('question-box');
    const floorTextElem = document.getElementById('card-floor-text');
    const btnFact = document.getElementById('btn-reveal-fact');
    const factBox = document.getElementById('gaffer-fact-box');
    const factText = document.getElementById('gaffer-fact-text');

    if (floorTextElem) {
        floorTextElem.innerHTML = `<span style="color: var(--genre-pitch);">Q${currentFloor + 1}</span> / ${questionsList.length}`;
    }

    if (factBox) factBox.style.display = 'none';

    if (selectedMode === 'group') {
        if (qTextElem) qTextElem.innerText = 'QUESTION MASKED — LISTEN TO YOUR GAFFER!';
        if (qBoxElem) qBoxElem.classList.add('masked');
        if (btnFact) btnFact.style.display = 'none';
    } else {
        if (qTextElem) qTextElem.innerText = q.question;
        if (qBoxElem) qBoxElem.classList.remove('masked');

        if (selectedMode === 'gaffer') {
            if (btnFact) btnFact.style.display = 'block';
            if (factText) factText.innerText = q.fact || q.explanation || 'No extra lore available for this question.';
        } else {
            if (btnFact) btnFact.style.display = 'none';
        }
    }

    // Resolve correct answer index whether specified by string (q.answer) or number (q.correct / q.correctIndex)
    let correctIndex = -1;
    if (typeof q.correct === 'number') {
        correctIndex = q.correct;
    } else if (typeof q.correctIndex === 'number') {
        correctIndex = q.correctIndex;
    } else if (typeof q.answer === 'number') {
        correctIndex = q.answer;
    } else if (typeof q.answer === 'string' && Array.isArray(q.options)) {
        correctIndex = q.options.findIndex(opt => opt.trim().toLowerCase() === q.answer.trim().toLowerCase());
    }
    if (correctIndex === -1) correctIndex = 0;

    const grid = document.getElementById('options-grid');
    if (grid) {
        grid.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.innerText = opt;
            btn.onclick = () => handleAnswer(idx, correctIndex, btn);
            grid.appendChild(btn);
        });
    }

    saveProgress();
}

window.toggleGafferFact = function() {
    const factBox = document.getElementById('gaffer-fact-box');
    if (factBox) {
        factBox.style.display = (factBox.style.display === 'block') ? 'none' : 'block';
    }
};

function handleAnswer(selectedIndex, correctIndex, btnElement) {
    if (isAnswering) return;
    isAnswering = true;

    const allButtons = document.querySelectorAll('.btn-option');

    if (selectedIndex === correctIndex) {
        btnElement.classList.add('selected-correct');
        correctCount++;
    } else {
        btnElement.classList.add('selected-wrong');
        if (allButtons[correctIndex]) {
            allButtons[correctIndex].classList.add('selected-correct');
        }
    }

    setTimeout(() => {
        currentFloor++;
        renderCurrentQuestion();
    }, 1200);
}

function saveProgress() {
    try {
        const state = {
            floor: currentFloor,
            correct: correctCount,
            time: timeElapsedSeconds,
            mode: selectedMode
        };
        localStorage.setItem('skyscraper_progress', JSON.stringify(state));
    } catch (e) {}
}

function finishGame() {
    clearInterval(timerInterval);
    localStorage.removeItem('skyscraper_progress');

    dailyAttempts++;
    try {
        localStorage.setItem('tyk_545_attempts_count', dailyAttempts.toString());
    } catch (e) {}

    const header = document.getElementById('gameplay-header');
    const floorHud = document.getElementById('floor-hud-container');
    const workspace = document.getElementById('game-workspace');
    const victory = document.getElementById('victory-screen');

    if (header) header.style.display = 'none';
    if (floorHud) floorHud.style.display = 'none';
    if (workspace) workspace.style.display = 'none';
    if (victory) victory.style.display = 'flex';

    const questionsList = getQuestions();
    const mins = String(Math.floor(timeElapsedSeconds / 60)).padStart(2, '0');
    const secs = String(timeElapsedSeconds % 60).padStart(2, '0');
    const formattedTime = `${mins}:${secs}`;

    const vTimeDisp = document.getElementById('victory-time-display');
    const vTimeRow = document.getElementById('victory-time-row-display');
    const accText = document.getElementById('accuracy-text');
    const vModeBadge = document.getElementById('victory-mode-badge');
    const attemptsVal = document.getElementById('attempts-notice-val');

    if (vTimeDisp) vTimeDisp.innerText = formattedTime;
    if (vTimeRow) vTimeRow.innerText = `${formattedTime}s`;
    if (accText) accText.innerText = `${correctCount}/${questionsList.length}`;
    if (vModeBadge) vModeBadge.innerText = `${selectedMode.toUpperCase()} PLAYER`;
    if (attemptsVal) attemptsVal.innerText = dailyAttempts;
}

window.resetAndPlayAgain = function() {
    location.reload();
};
// END OF FILE: 545-special.js
