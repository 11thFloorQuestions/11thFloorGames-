// ==========================================================================
// 11th Floor Parity — Daily Dataset & Curated Vector Pairs
// Theme: "Maritime & Deep Sea Exploration" (10 Sequential Floors)
// ==========================================================================

window.PARITY_DAILY_SET = {
    title: "Maritime & Deep Sea Exploration",
    floors: [
        { floor: 1, pairs: 1, timeLimit: 12, icons: ["anchor"] },
        { floor: 2, pairs: 2, timeLimit: 16, icons: ["anchor", "helm"] },
        { floor: 3, pairs: 3, timeLimit: 22, icons: ["anchor", "helm", "compass"] },
        { floor: 4, pairs: 4, timeLimit: 28, icons: ["anchor", "helm", "compass", "lighthouse"] },
        { floor: 5, pairs: 5, timeLimit: 34, icons: ["anchor", "helm", "compass", "lighthouse", "submersible"] },
        { floor: 6, pairs: 6, timeLimit: 40, icons: ["anchor", "helm", "compass", "lighthouse", "submersible", "trident_sea"] },
        { floor: 7, pairs: 7, timeLimit: 46, icons: ["anchor", "helm", "compass", "lighthouse", "submersible", "trident_sea", "kraken"] },
        { floor: 8, pairs: 8, timeLimit: 52, icons: ["anchor", "helm", "compass", "lighthouse", "submersible", "trident_sea", "kraken", "sextant"] },
        { floor: 9, pairs: 9, timeLimit: 58, icons: ["anchor", "helm", "compass", "lighthouse", "submersible", "trident_sea", "kraken", "sextant", "diver_helmet"] },
        { floor: 10, pairs: 10, timeLimit: 64, icons: ["anchor", "helm", "compass", "lighthouse", "submersible", "trident_sea", "kraken", "sextant", "diver_helmet", "shipwreck"] }
    ],
    svgMap: {
        anchor: `<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2" fill="none" stroke="#00F0FF" stroke-width="1.5"/><path d="M12 7v13M5 13a7 7 0 0 0 14 0M8 20h8M9 10h6" fill="none" stroke="#00F0FF" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        helm: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#0d1117" stroke="#FFD700" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="#FFD700"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5M4.93 4.93l3.54 3.54M15.54 15.54l3.54 3.54M4.93 19.07l3.54-3.54M15.54 8.46l3.54-3.54" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        compass: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><polygon points="12,5 14,12 12,19 10,12" fill="#39FF14"/><circle cx="12" cy="12" r="1.5" fill="#0d1117"/></svg>`,
        lighthouse: `<svg viewBox="0 0 24 24"><polygon points="8,22 10,8 14,8 16,22" fill="#0d1117" stroke="#FF007F" stroke-width="1.5"/><rect x="9" y="4" width="6" height="4" fill="none" stroke="#FF007F" stroke-width="1.5"/><path d="M4 6l5 1M20 6l-5 1" stroke="#FF007F" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        submersible: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="13" rx="8" ry="5" fill="#0d1117" stroke="#7000FF" stroke-width="1.5"/><circle cx="9" cy="13" r="1.5" fill="#7000FF"/><circle cx="14" cy="13" r="1.5" fill="#7000FF"/><path d="M12 8V4h3M20 13h2" stroke="#7000FF" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        trident_sea: `<svg viewBox="0 0 24 24"><path d="M12 3v18M7 5v5c0 2.8 2.2 5 5 5s5-2.2 5-5V5" fill="none" stroke="#ff9999" stroke-width="1.5" stroke-linecap="round"/><polygon points="7,2 5,5 9,5" fill="#ff9999"/><polygon points="12,1 10,4 14,4" fill="#ff9999"/><polygon points="17,2 15,5 19,5" fill="#ff9999"/></svg>`,
        kraken: `<svg viewBox="0 0 24 24"><path d="M6 10c0-3.3 2.7-6 6-6s6 2.7 6 6M4 14c1 2 1 4 0 6M8 14c1 2 1 4 0 6M12 14c1 2 1 4 0 6M16 14c1 2 1 4 0 6M20 14c1 2 1 4 0 6" fill="none" stroke="#00F0FF" stroke-width="1.5" stroke-linecap="round"/><circle cx="9.5" cy="10" r="1" fill="#00F0FF"/><circle cx="14.5" cy="10" r="1" fill="#00F0FF"/></svg>`,
        sextant: `<svg viewBox="0 0 24 24"><path d="M4 18A12 12 0 0 1 18 4M4 18l14-14M4 18l10 2M18 4l2 10" fill="none" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="4" r="2" fill="#FFD700"/></svg>`,
        diver_helmet: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><circle cx="12" cy="11" r="4" fill="none" stroke="#39FF14" stroke-width="1.5"/><rect x="8" y="19" width="8" height="3" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/></svg>`,
        shipwreck: `<svg viewBox="0 0 24 24"><path d="M3 18l4-8 5 3 4-6 5 11H3z" fill="#0d1117" stroke="#FF007F" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="13" x2="12" y2="5" stroke="#FF007F" stroke-width="1.5"/><line x1="8" y1="18" x2="16" y2="18" stroke="#FF007F" stroke-width="1.5"/></svg>`
    }
};
