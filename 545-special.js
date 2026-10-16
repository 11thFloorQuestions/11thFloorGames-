let currentFloor = 0;
let selectedMode = 'solo'; // 'solo', 'gaffer', 'group'
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
    const btn = document.getElementById('btn-sound-
