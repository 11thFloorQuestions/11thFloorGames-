// 11th Floor Word Climb - Internal Dictionary Loader
window.WORD_LIST = new Set();
window.WORD_LIST_LOADED = false;
window.WORD_LIST_PROMISE = null;

window.fetchDictionary = function() {
    window.WORD_LIST_PROMISE = new Promise((resolve) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error('Fallback dictionary inaccessible');
                return res.text();
            })
            .then(text => {
                clearTimeout(timeoutId);
                const lines = text.split(/\r?\n/);
                window.WORD_LIST.clear();
                
                for (let i = 0; i < lines.length; i++) {
                    const trimmed = lines[i].trim().toUpperCase();
                    if (trimmed.length >= 5 && trimmed.length <= 9) {
                        window.WORD_LIST.add(trimmed);
                    }
                }
                
                if (window.WORD_LIST.size > 0) {
                    window.WORD_LIST_LOADED = true;
                    console.log(`[11FL Dictionary] Fully loaded ${window.WORD_LIST.size} valid words.`);
                    resolve(true);
                } else {
                    throw new Error('Dictionary loaded but contained no valid 5-9 letter words');
                }
            })
            .catch(err => {
                clearTimeout(timeoutId);
                console.error('[11FL Dictionary] Error loading dictionary:', err);
                window.WORD_LIST_LOADED = false;
                resolve(false);
            });
    });
    return window.WORD_LIST_PROMISE;
};

// Initiate immediate load
window.fetchDictionary();
