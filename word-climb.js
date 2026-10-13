// DAILY PUZZLE INITIALIZATION - Set 57 (FLAMINGOS)
function initDailyPuzzle() {
    masterNineLetterWord = "FLAMINGOS";
    const initialArr = ["F", "L", "A", "M", "I", "N", "G", "O", "S"];
    initialDailyWheel = shuffleAndVerifyWheel(initialArr, masterNineLetterWord);
    wheelLetters = [...initialDailyWheel];
}

// HARDENED FALLBACK DICTIONARY - Set 57 (FLAMINGOS)
const INTERNAL_FALLBACK_WORDS = new Set([
    "AMONG", "ALONG", "GOALS", "FOALS", "MAILS", "SNAIL", "SLANG", "LOGAN",
    "LOGINS", "ALONGS",
    "FLAMING", "LOAFING", "FOALING",
    "FLAMINGS", "LOAFINGS",
    "FLAMINGOS"
]);
