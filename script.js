/**
 * 11th Floor Games | General Questions Engine
 * Handles question presentation, timer state transitions, and scoring logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_TIMER_SECONDS = 15;
    const WARNING_THRESHOLD_SECONDS = 7.5; // 50% Jeopardy mode threshold

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval = null;
    let timeRemaining = TOTAL_TIMER_SECONDS;

    const timerBar = document.getElementById('timer-bar');
    const questionText = document.getElementById('question-text');
    const optionsGrid = document.getElementById('options-grid');
    const scoreDisplay = document.getElementById('score-display');
    const nextButton = document.getElementById('next-btn');

    async function loadQuestions() {
        try {
            const response = await fetch('questions.json');
            if (!response.ok) throw new Error('Primary source unavailable');
            questions = await response.json();
        } catch (primaryError) {
            console.warn('Primary question dataset fetch failed. Attempting fallback to sandbox.01.json...', primaryError);
            try {
                const fallbackResponse = await fetch('sandbox.01.json');
                if (!fallbackResponse.ok) throw new Error('Fallback dataset unreachable');
                questions = await fallbackResponse.json();
            } catch (fallbackError) {
                console.error('Fatal: Failed to load both primary and fallback question datasets.', fallbackError);
                questionText.textContent = 'Unable to load quiz content. Please refresh or check connection.';
                return;
            }
        }

        if (questions && questions.length > 0) {
            renderQuestion();
        }
    }

    function startQuestionTimer() {
        clearInterval(timerInterval);
        timeRemaining = TOTAL_TIMER_SECONDS;
        
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.classList.remove('warning');
        }

        const tickRateMs = 100;
        const totalMs = TOTAL_TIMER_SECONDS * 1000;
        let elapsedMs = 0;

        timerInterval = setInterval(() => {
            elapsedMs += tickRateMs;
            timeRemaining = Math.max(0, TOTAL_TIMER_SECONDS - (elapsedMs / 1000));
            
            const remainingPercentage = (timeRemaining / TOTAL_TIMER_SECONDS) * 100;
            
            if (timerBar) {
                timerBar.style.width = `${remainingPercentage}%`;

                // 50% Jeopardy Mode state transition
                if (timeRemaining <= WARNING_THRESHOLD_SECONDS) {
                    timerBar.classList.add('warning');
                } else {
                    timerBar.classList.remove('warning');
                }
            }

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, tickRateMs);
    }

    function renderQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsGrid.innerHTML = '';
        nextButton.style.display = 'none';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => handleOptionSelection(index, currentQuestion.correctAnswer));
            optionsGrid.appendChild(button);
        });

        startQuestionTimer();
    }

    function handleOptionSelection(selectedIndex, correctIndex) {
        clearInterval(timerInterval);
        const buttons = optionsGrid.querySelectorAll('.option-btn');

        buttons.forEach((button, idx) => {
            button.disabled = true;
            if (idx === correctIndex) {
                button.classList.add('correct');
            } else if (idx === selectedIndex) {
                button.classList.add('incorrect');
            }
        });

        if (selectedIndex === correctIndex) {
            score += Math.ceil(timeRemaining * 10);
            scoreDisplay.textContent = `Score: ${score}`;
        }

        nextButton.style.display = 'inline-block';
    }

    function handleTimeOut() {
        const currentQuestion = questions[currentQuestionIndex];
        const buttons = optionsGrid.querySelectorAll('.option-btn');

        buttons.forEach((button, idx) => {
            button.disabled = true;
            if (idx === currentQuestion.correctAnswer) {
                button.classList.add('correct');
            }
        });

        nextButton.style.display = 'inline-block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            questionText.textContent = `Quiz Complete! Final Score: ${score}`;
            optionsGrid.innerHTML = '';
            if (timerBar) timerBar.style.width = '0%';
            nextButton.style.display = 'none';
        }
    });

    loadQuestions();
});
