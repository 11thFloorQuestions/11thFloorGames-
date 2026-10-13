// ==========================================================================
// 11th Floor Word Climb - Daily Game Engine (Set 57)
// Active Master Word: MAGNITUDE
// ==========================================================================

// DAILY PUZZLE INITIALIZATION - Set 57 (MAGNITUDE)
function initDailyPuzzle() {
    masterNineLetterWord = "MAGNITUDE";
    const initialArr = ["M", "A", "G", "N", "I", "T", "U", "D", "E"];
    initialDailyWheel = shuffleAndVerifyWheel(initialArr, masterNineLetterWord);
    wheelLetters = [...initialDailyWheel];
}

// HARDENED FALLBACK DICTIONARY - Set 57 (MAGNITUDE)
const INTERNAL_FALLBACK_WORDS = new Set([
    "GIANT", "AGENT", "GUIDE", "IMAGE", "MEDIA", "AMEND", "UNITE", "MINED",
    "UNITED", "DATING", "MAGNET", "GAINED", "TANDEM",
    "UNTAMED", "GAUNTED",
    "UNTAMING",
    "MAGNITUDE"
]);
