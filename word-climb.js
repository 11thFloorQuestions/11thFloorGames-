// DAILY PUZZLE INITIALIZATION - SPEARHEAD
function initDailyPuzzle() {
    masterNineLetterWord = "SPEARHEAD";
    const initialArr = ["S", "P", "E", "A", "R", "H", "E", "A", "D"];
    initialDailyWheel = shuffleAndVerifyWheel(initialArr, masterNineLetterWord);
    wheelLetters = [...initialDailyWheel];
}
