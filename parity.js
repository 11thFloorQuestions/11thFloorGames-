function updateTimerBar() {
        if (!timerBarFill) return;
        const pct = Math.max(0, (timeRemaining / totalFloorTime) * 100);
        timerBarFill.style.width = `${pct}%`;

        // Turn red at halfway point (<= 50%), otherwise active yellow
        if (pct <= 50) {
            timerBarFill.style.backgroundColor = 'var(--state-error)';
            timerBarFill.style.boxShadow = '0 0 10px var(--state-error-glow)';
        } else {
            timerBarFill.style.backgroundColor = 'var(--state-active)';
            timerBarFill.style.boxShadow = '0 0 8px var(--state-active-glow)';
        }
    }

    function updateStatsDisplay() {
        const stats = getStats();
        const playedElem = document.getElementById('stat-played');
        const winsElem = document.getElementById('stat-wins');
        const winrateElem = document.getElementById('stat-winrate');
        const streakElem = document.getElementById('stat-streak');
        const bestfloorElem = document.getElementById('stat-bestfloor');

        if (playedElem) playedElem.textContent = stats.played;
        if (winsElem) winsElem.textContent = stats.wins;

        const winRate = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
        if (winrateElem) winrateElem.textContent = `${winRate}%`;
        if (streakElem) streakElem.textContent = `${stats.streak}`;

        const bestOrd = ordinals[stats.bestFloor - 1] || `${stats.bestFloor}th`;
        if (bestfloorElem) {
            bestfloorElem.innerHTML = `<span style="color: var(--genre-pink);">${bestOrd}</span> <span style="color: #ffffff;">Floor</span>`;
        }
    }
