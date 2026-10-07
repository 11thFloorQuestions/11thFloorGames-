// ==========================================================================
// 11th Floor Parity — Daily Dataset & Curated Vector Pairs
// Theme: "Ancient Runes & Relics" (10 Sequential Floors)
// ==========================================================================

window.PARITY_DAILY_SET = {
    title: "Ancient Runes & Relics",
    floors: [
        { floor: 1, pairs: 1, timeLimit: 12, icons: ["ankh"] },
        { floor: 2, pairs: 2, timeLimit: 16, icons: ["ankh", "scarab"] },
        { floor: 3, pairs: 3, timeLimit: 22, icons: ["ankh", "scarab", "pyramid"] },
        { floor: 4, pairs: 4, timeLimit: 28, icons: ["ankh", "scarab", "pyramid", "eye"] },
        { floor: 5, pairs: 5, timeLimit: 34, icons: ["ankh", "scarab", "pyramid", "eye", "chalice"] },
        { floor: 6, pairs: 6, timeLimit: 40, icons: ["ankh", "scarab", "pyramid", "eye", "chalice", "trident"] },
        { floor: 7, pairs: 7, timeLimit: 46, icons: ["ankh", "scarab", "pyramid", "eye", "chalice", "trident", "crown"] },
        { floor: 8, pairs: 8, timeLimit: 52, icons: ["ankh", "scarab", "pyramid", "eye", "chalice", "trident", "crown", "shield"] },
        { floor: 9, pairs: 9, timeLimit: 58, icons: ["ankh", "scarab", "pyramid", "eye", "chalice", "trident", "crown", "shield", "tome"] },
        { floor: 10, pairs: 10, timeLimit: 64, icons: ["ankh", "scarab", "pyramid", "eye", "chalice", "trident", "crown", "shield", "tome", "amulet"] }
    ],
    svgMap: {
        ankh: `<svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4zm0 11v9m-5-5h10" fill="none" stroke="#ff9999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        scarab: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="13" rx="5" ry="7" fill="#0d1117" stroke="#00F0FF" stroke-width="1.5"/><circle cx="12" cy="5" r="2.5" fill="#00F0FF"/><line x1="12" y1="6" x2="12" y2="20" stroke="#00F0FF" stroke-width="1.5"/><path d="M7 11 H2 M17 11 H22 M7 16 H3 M17 16 H21" stroke="#00F0FF" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        pyramid: `<svg viewBox="0 0 24 24"><polygon points="12,3 2,19 22,19" fill="#0d1117" stroke="#FFD700" stroke-width="1.5"/><line x1="12" y1="3" x2="14" y2="19" stroke="#FFD700" stroke-width="1.5"/></svg>`,
        eye: `<svg viewBox="0 0 24 24"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#39FF14"/><circle cx="12" cy="12" r="1" fill="#0d1117"/></svg>`,
        chalice: `<svg viewBox="0 0 24 24"><path d="M6 3h12v5c0 3.3-2.7 6-6 6s-6-2.7-6-6V3zm6 11v5m-4 0h8" fill="none" stroke="#FF007F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="6" r="1.5" fill="#FF007F"/></svg>`,
        trident: `<svg viewBox="0 0 24 24"><path d="M12 2v20M6 4v6c0 3.3 2.7 6 6 6s6-2.7 6-6V4" fill="none" stroke="#7000FF" stroke-width="1.5" stroke-linecap="round"/><polygon points="6,2 4,5 8,5" fill="#7000FF"/><polygon points="12,1 10,4 14,4" fill="#7000FF"/><polygon points="18,2 16,5 20,5" fill="#7000FF"/></svg>`,
        crown: `<svg viewBox="0 0 24 24"><polygon points="3,18 5,8 9,12 12,5 15,12 19,8 21,18" fill="#0d1117" stroke="#FFD700" stroke-width="1.5" stroke-linejoin="round"/><circle cx="5" cy="7" r="1" fill="#FFD700"/><circle cx="12" cy="4" r="1" fill="#FFD700"/><circle cx="19" cy="7" r="1" fill="#FFD700"/></svg>`,
        shield: `<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" fill="#0d1117" stroke="#00F0FF" stroke-width="1.5"/><path d="M12 6v10M8 10h8" stroke="#00F0FF" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        tome: `<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><line x1="8" y1="3" x2="8" y2="21" stroke="#39FF14" stroke-width="1.5"/><polygon points="13,8 16,11 13,14" fill="#39FF14"/></svg>`,
        amulet: `<svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="7" fill="#0d1117" stroke="#ff9999" stroke-width="1.5"/><path d="M9 3l3 4 3-4" fill="none" stroke="#ff9999" stroke-width="1.5" stroke-linecap="round"/><polygon points="12,10 14,14 12,18 10,14" fill="#ff9999"/></svg>`
    }
};
