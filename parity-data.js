// ==========================================================================
// 11th Floor Parity — Daily Dataset & Curated Vector Pairs
// Theme: "Celestial Constellations" (10 Sequential Floors)
// ==========================================================================

window.PARITY_DAILY_SET = {
    title: "Celestial Constellations",
    floors: [
        { floor: 1, pairs: 1, timeLimit: 12, icons: ["sun"] },
        { floor: 2, pairs: 2, timeLimit: 16, icons: ["sun", "crescent"] },
        { floor: 3, pairs: 3, timeLimit: 22, icons: ["sun", "crescent", "nova"] },
        { floor: 4, pairs: 4, timeLimit: 28, icons: ["sun", "crescent", "nova", "comet"] },
        { floor: 5, pairs: 5, timeLimit: 34, icons: ["sun", "crescent", "nova", "comet", "saturn"] },
        { floor: 6, pairs: 6, timeLimit: 40, icons: ["sun", "crescent", "nova", "comet", "saturn", "pulsar"] },
        { floor: 7, pairs: 7, timeLimit: 46, icons: ["sun", "crescent", "nova", "comet", "saturn", "pulsar", "eclipse"] },
        { floor: 8, pairs: 8, timeLimit: 52, icons: ["sun", "crescent", "nova", "comet", "saturn", "pulsar", "eclipse", "nebula"] },
        { floor: 9, pairs: 9, timeLimit: 58, icons: ["sun", "crescent", "nova", "comet", "saturn", "pulsar", "eclipse", "nebula", "zenith"] },
        { floor: 10, pairs: 10, timeLimit: 64, icons: ["sun", "crescent", "nova", "comet", "saturn", "pulsar", "eclipse", "nebula", "zenith", "cosmos"] }
    ],
    svgMap: {
        sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#FFD700"/><circle cx="12" cy="12" r="9" fill="none" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="2 2"/><line x1="12" y1="1" x2="12" y2="4" stroke="#FFD700" stroke-width="2"/><line x1="12" y1="20" x2="12" y2="23" stroke="#FFD700" stroke-width="2"/><line x1="1" y1="12" x2="4" y2="12" stroke="#FFD700" stroke-width="2"/><line x1="20" y1="12" x2="23" y2="12" stroke="#FFD700" stroke-width="2"/></svg>`,
        crescent: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 1 1-9-9z" fill="#00F0FF" stroke="#0d1117" stroke-width="1"/></svg>`,
        nova: `<svg viewBox="0 0 24 24"><polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" fill="#FF007F"/></svg>`,
        comet: `<svg viewBox="0 0 24 24"><circle cx="6" cy="18" r="3.5" fill="#39FF14"/><path d="M8.5 16.5L20 4M9 19L21 8M6 14.5L16 3" stroke="#39FF14" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        saturn: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#7000FF"/><ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="#00F0FF" stroke-width="1.5" transform="rotate(-25 12 12)"/></svg>`,
        pulsar: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#FF007F"/><circle cx="12" cy="12" r="6" fill="none" stroke="#FF007F" stroke-width="1.5"/><circle cx="12" cy="12" r="9" fill="none" stroke="#39FF14" stroke-width="1.5" stroke-dasharray="3 3"/></svg>`,
        eclipse: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="#FFD700" stroke-width="2"/><circle cx="10" cy="12" r="7.5" fill="#0d1117"/></svg>`,
        nebula: `<svg viewBox="0 0 24 24"><path d="M6 12c0-3 2-6 6-6s6 2 6 5-2 7-6 7-6-3-6-6z" fill="#7000FF" opacity="0.6"/><circle cx="9" cy="10" r="2" fill="#00F0FF"/><circle cx="15" cy="14" r="1.5" fill="#39FF14"/></svg>`,
        zenith: `<svg viewBox="0 0 24 24"><polygon points="12,3 15,9 21,12 15,15 12,21 9,15 3,12 9,9" fill="#00F0FF"/><circle cx="12" cy="12" r="2" fill="#0d1117"/></svg>`,
        cosmos: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="#0d1117" stroke="#7000FF" stroke-width="1.5"/><circle cx="8" cy="8" r="1.5" fill="#FFD700"/><circle cx="16" cy="7" r="1" fill="#00F0FF"/><circle cx="12" cy="14" r="2" fill="#FF007F"/><circle cx="7" cy="17" r="1" fill="#39FF14"/></svg>`
    }
};
