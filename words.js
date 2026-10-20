// 11th Floor Word Climb - Word List Loader (v0.5)
//
// What changed from the old loader:
//  - Tries a local file first (word-list.txt, if you ever host one), then two online sources
//  - Waits up to 45 seconds per source (was 8, which failed on slow connections)
//  - Remembers the list on the device after the first successful load, so later visits are instant
//  - Only one load runs at a time
//
// The page API is unchanged: window.WORD_LIST (Set), window.WORD_LIST_LOADED,
// window.WORD_LIST_PROMISE and window.fetchDictionary().

(function () {
    window.WORD_LIST = new Set();
    window.WORD_LIST_LOADED = false;
    window.WORD_LIST_PROMISE = null;

    var CACHE_KEY = '11fl_wordlist_v1';
    var TIMEOUT_MS = 45000;
    var SOURCES = [
        './word-list.txt',
        'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt',
        'https://cdn.jsdelivr.net/gh/dwyl/english-words@master/words_alpha.txt'
    ];
    var pending = false;

    function addWordsFromText(text) {
        var lines = text.split(/\r?\n/);
        var kept = [];
        for (var i = 0; i < lines.length; i++) {
            var w = lines[i].trim().toUpperCase();
            if (w.length >= 5 && w.length <= 9 && /^[A-Z]+$/.test(w)) {
                window.WORD_LIST.add(w);
                kept.push(w);
            }
        }
        return kept;
    }

    function loadFromCache() {
        try {
            var cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return false;
            addWordsFromText(cached);
            return window.WORD_LIST.size > 0;
        } catch (e) {
            return false;
        }
    }

    function saveToCache(words) {
        try {
            localStorage.setItem(CACHE_KEY, words.join('\n'));
        } catch (e) {
            // Storage full or blocked: the list still works for this visit.
        }
    }

    function fetchOne(url) {
        return new Promise(function (resolve) {
            var controller = new AbortController();
            var timeoutId = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);
            fetch(url, { signal: controller.signal })
                .then(function (res) {
                    if (!res.ok) throw new Error('Not available: ' + url);
                    return res.text();
                })
                .then(function (text) {
                    clearTimeout(timeoutId);
                    resolve(text);
                })
                .catch(function () {
                    clearTimeout(timeoutId);
                    resolve(null);
                });
        });
    }

    async function loadFromSources() {
        for (var i = 0; i < SOURCES.length; i++) {
            var text = await fetchOne(SOURCES[i]);
            if (!text) continue;
            window.WORD_LIST.clear();
            var kept = addWordsFromText(text);
            if (window.WORD_LIST.size > 0) {
                saveToCache(kept);
                return true;
            }
        }
        return false;
    }

    window.fetchDictionary = function () {
        if (window.WORD_LIST_LOADED) return Promise.resolve(true);
        if (pending && window.WORD_LIST_PROMISE) return window.WORD_LIST_PROMISE;

        pending = true;
        window.WORD_LIST_PROMISE = new Promise(function (resolve) {
            if (loadFromCache()) {
                window.WORD_LIST_LOADED = true;
                pending = false;
                console.log('[11FL Dictionary] Loaded ' + window.WORD_LIST.size + ' words from this device.');
                resolve(true);
                return;
            }

            loadFromSources().then(function (ok) {
                window.WORD_LIST_LOADED = ok;
                pending = false;
                if (ok) {
                    console.log('[11FL Dictionary] Fully loaded ' + window.WORD_LIST.size + ' valid words.');
                } else {
                    console.error('[11FL Dictionary] Could not load the word list from any source.');
                }
                resolve(ok);
            });
        });
        return window.WORD_LIST_PROMISE;
    };

    // Start loading straight away so it is ready by the time the player taps Start Climb.
    window.fetchDictionary();
})();
