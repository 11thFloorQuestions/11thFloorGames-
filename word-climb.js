// ==========================================================================
// 11th Floor Word Climb - Main Daily Game Engine (Set 57)
// Active Master Word: MAGNITUDE
// ==========================================================================

// HARDENED FALLBACK DICTIONARY - Complete Set 57 Coverage
const INTERNAL_FALLBACK_WORDS = new Set([
    // 5-letter valid words
    "GIANT", "AGENT", "GUIDE", "IMAGE", "MEDIA", "AMEND", "UNITE", "MINED", "TIMED", "TAME",
    // 6-letter valid words
    "UNITED", "DATING", "MAGNET", "GAINED", "TANDEM", "GAUNT",
    // 7-letter valid words
    "UNTAMED", "GAUNTED", "MATED",
    // 8-letter valid words
    "UNTAMING",
    // 9-letter master word
    "MAGNITUDE"
]);

// DAILY PUZZLE INITIALIZATION - Set 57 (MAGNITUDE)
function initDailyPuzzle() {
    masterNineLetterWord = "MAGNITUDE";
    const initialArr = ["M", "A", "G", "N", "I", "T", "U", "D", "E"];
    initialDailyWheel = shuffleAndVerifyWheel(initialArr, masterNineLetterWord);
    wheelLetters = [...initialDailyWheel];
}
