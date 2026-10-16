/**
 * 5.45 Special - 11th Floor Games Ecosystem
 * Core Application Logic & State Controller
 */

(function () {
  'use strict';

  // Game Configuration & State
  let currentMode = 'standard';
  let currentQuestionIndex = 0;
  let score = 0;
  let currentFloor = 1;
  let timeRemaining = 345; // 5 minutes 45 seconds = 345 seconds
  let timerInterval = null;
  let isAnswering = false;

  // Question Dataset Fallback (if data file loading encounters delays)
  const fallbackQuestions = [
    {
      question: "Which club won the inaugural English Premier League title in the 1992-93 season?",
      options: ["Manchester United", "Aston Villa", "Blackburn Rovers", "Norwich City"],
      correct: 0
    },
    {
      question: "Who holds the record for the most Premier League goals scored in a single 38-game season?",
      options: ["Alan Shearer", "Erling Haaland", "Mohamed Salah", "Cristiano Ronaldo"],
      correct: 1
    },
    {
      question: "Which English club has won the European Cup / UEFA Champions League 6 times?",
      options: ["Manchester United", "Liverpool", "Chelsea", "Nottingham Forest"],
      correct: 1
    }
  ];

  function getQuestions() {
    if (typeof window.specialQuizQuestions !== 'undefined' && Array.isArray(window.specialQuizQuestions) && window.specialQuizQuestions.length > 0) {
      return window.specialQuizQuestions;
    }
    return fallbackQuestions;
  }

  // Modal Control Functions
  window.openRulesModal = function () {
    const modal = document.getElementById('rules-modal');
    if (modal) {
      modal.classList.add('active');
    }
  };

  window.closeRulesModal = function () {
    const modal = document.getElementById('rules-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  };

  // Mode Selection
  window.selectMode = function (mode) {
    currentMode = mode;
    
    const modes = ['standard', 'gaffer', 'group'];
    modes.forEach(m => {
      const btn = document.getElementById(`btn-mode-${m}`);
      if (btn) {
        if (m === mode) {
          btn.classList.add('selected');
        } else {
          btn.classList.remove('selected');
        }
      }
    });
  };

  // Game Flow Control
  window.startSkyscraperGame = function () {
    const landingView = document.getElementById('landing-view');
    const gameplayView = document.getElementById('gameplay-view');
    
    if (landingView) landingView.classList.add('hidden');
    if (gameplayView) gameplayView.classList.remove('hidden');

    currentQuestionIndex = 0;
    score = 0;
    currentFloor = 1;
    timeRemaining = 345; // 5:45
    isAnswering = false;

    updateHUD();
    startTimer();
    renderQuestion();
  };

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateHUD();

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endGame(false);
      }
    }, 1000);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateHUD() {
    const floorElem = document.getElementById('hud-floor');
    const scoreElem = document.getElementById('hud-score');
    const timerElem = document.getElementById('hud-timer');

    if (floorElem) floorElem.textContent = `${currentFloor} / 51`;
    if (scoreElem) scoreElem.textContent = score;
    if (timerElem) {
      timerElem.textContent = formatTime(timeRemaining);
      if (timeRemaining <= 30) {
        timerElem.classList.add('timer-danger');
      } else {
        timerElem.classList.remove('timer-danger');
      }
    }
  }

  function renderQuestion() {
    const questions = getQuestions();
    
    if (currentQuestionIndex >= questions.length || currentFloor >= 51) {
      endGame(true);
      return;
    }

    const q = questions[currentQuestionIndex];
    const qTextElem = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    if (qTextElem) qTextElem.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
    if (answersContainer) {
      answersContainer.innerHTML = '';

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswerSelect(idx, q.correct, btn);
        answersContainer.appendChild(btn);
      });
    }

    isAnswering = false;
  }

  function handleAnswerSelect(selectedIdx, correctIdx, btnElement) {
    if (isAnswering) return;
    isAnswering = true;

    const allButtons = document.querySelectorAll('.answer-btn');

    if (selectedIdx === correctIdx) {
      btnElement.classList.add('correct');
      score += 100;
      currentFloor++;
    } else {
      btnElement.classList.add('incorrect');
      if (allButtons[correctIdx]) {
        allButtons[correctIdx].classList.add('correct');
      }
      
      if (currentMode === 'gaffer') {
        currentFloor = Math.max(1, currentFloor - 1);
      }
    }

    setTimeout(() => {
      currentQuestionIndex++;
      updateHUD();
      renderQuestion();
    }, 1000);
  }

  function endGame(completed) {
    clearInterval(timerInterval);

    const gameplayView = document.getElementById('gameplay-view');
    const resultsView = document.getElementById('results-view');
    const finalScoreElem = document.getElementById('final-score');
    const floorsReachedElem = document.getElementById('floors-reached');
    const resultsTitleElem = document.getElementById('results-title');

    if (gameplayView) gameplayView.classList.add('hidden');
    if (resultsView) resultsView.classList.remove('hidden');

    if (finalScoreElem) finalScoreElem.textContent = score;
    if (floorsReachedElem) floorsReachedElem.textContent = `Floors Climbed: ${currentFloor} / 51`;
    
    if (resultsTitleElem) {
      resultsTitleElem.textContent = completed ? 'Skyscraper Conquered!' : 'Time Expired!';
    }
  }

  // Close modal when clicking outside content boundary
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('rules-modal');
    if (e.target === modal) {
      window.closeRulesModal();
    }
  });

})();
// END OF FILE: 545-special.js
