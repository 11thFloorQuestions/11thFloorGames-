// ==========================================================================
// 11th Floor Parity — Daily Dataset & Curated Vector Pairs
// Theme: "Animal Kingdom" (Set 31)
// ==========================================================================

window.PARITY_DAILY_SET = {
    title: "Animal Kingdom",
    floors: [
        { floor: 1, pairs: 1, timeLimit: 12, icons: ["cat"] },
        { floor: 2, pairs: 2, timeLimit: 16, icons: ["cat", "dog"] },
        { floor: 3, pairs: 3, timeLimit: 22, icons: ["cat", "dog", "owl"] },
        { floor: 4, pairs: 4, timeLimit: 28, icons: ["cat", "dog", "owl", "fish"] },
        { floor: 5, pairs: 5, timeLimit: 34, icons: ["cat", "dog", "owl", "fish", "rabbit"] },
        { floor: 6, pairs: 6, timeLimit: 40, icons: ["cat", "dog", "owl", "fish", "rabbit", "turtle"] },
        { floor: 7, pairs: 7, timeLimit: 46, icons: ["cat", "dog", "owl", "fish", "rabbit", "turtle", "bear"] },
        { floor: 8, pairs: 8, timeLimit: 52, icons: ["cat", "dog", "owl", "fish", "rabbit", "turtle", "bear", "snake"] },
        { floor: 9, pairs: 9, timeLimit: 58, icons: ["cat", "dog", "owl", "fish", "rabbit", "turtle", "bear", "snake", "elephant"] },
        { floor: 10, pairs: 10, timeLimit: 64, icons: ["cat", "dog", "owl", "fish", "rabbit", "turtle", "bear", "snake", "elephant", "lion"] }
    ],
    svgMap: {
        cat: `<svg viewBox="0 0 24 24"><path d="M12 13c-2.5 0-4.5 1.5-4.5 3.5 0 2 2 3.5 4.5 3.5s4.5-1.5 4.5-3.5c0-2-2-3.5-4.5-3.5z" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><path d="M5 8l3 4M19 8l-3 4" stroke="#39FF14" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="11" r="1" fill="#39FF14"/><circle cx="15" cy="11" r="1" fill="#39FF14"/><path d="M12 13l-1 1h2l-1-1z" fill="#39FF14"/><path d="M4 14h3M20 14h-3M4 16h4M20 16h-4" stroke="#39FF14" stroke-width="1.2"/></svg>`,
        dog: `<svg viewBox="0 0 24 24"><path d="M6 5c-1 2-2 5-1 7s3 2 4 0l-1-5M18 5c1 2 2 5 1 7s-3 2-4 0l1-5" fill="#0d1117" stroke="#00F0FF" stroke-width="1.5"/><path d="M7 10c0-3 2.2-5 5-5s5 2 5 5c0 4-2 7-5 7s-5-3-5-7z" fill="#0d1117" stroke="#00F0FF" stroke-width="1.5"/><circle cx="10" cy="10" r="1" fill="#00F0FF"/><circle cx="14" cy="10" r="1" fill="#00F0FF"/><ellipse cx="12" cy="13" rx="1.5" ry="1" fill="#00F0FF"/><path d="M12 14v2c-1 0-1.5 1-1.5 1" stroke="#00F0FF" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        owl: `<svg viewBox="0 0 24 24"><path d="M6 4l3 3h6l3-3v14c0 2-2 3-6 3s-6-1-6-3V4z" fill="#0d1117" stroke="#FF007F" stroke-width="1.5"/><circle cx="9.5" cy="11" r="2.5" stroke="#FF007F" stroke-width="1.5" fill="none"/><circle cx="14.5" cy="11" r="2.5" stroke="#FF007F" stroke-width="1.5" fill="none"/><circle cx="9.5" cy="11" r="1" fill="#FF007F"/><circle cx="14.5" cy="11" r="1" fill="#FF007F"/><path d="M12 13.5l-1 2.5h2l-1-2.5z" fill="#FF007F"/></svg>`,
        fish: `<svg viewBox="0 0 24 24"><path d="M3 12c4-5 12-5 16 0-4 5-12 5-16 0z" fill="#0d1117" stroke="#FFD700" stroke-width="1.5"/><path d="M19 12l3-4v8l-3-4z" fill="#0d1117" stroke="#FFD700" stroke-width="1.5"/><circle cx="7" cy="11" r="1" fill="#FFD700"/><path d="M11 9c1 1.5 1 4.5 0 6" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        rabbit: `<svg viewBox="0 0 24 24"><path d="M9 2c-1 0-2 3-1 7l2 1M15 2c1 0 2 3 1 7l-2 1" fill="#0d1117" stroke="#7000FF" stroke-width="1.5"/><path d="M7 13c0-3 2.2-4 5-4s5 1 5 4c0 3.5-2 6-5 6s-5-2.5-5-6z" fill="#0d1117" stroke="#7000FF" stroke-width="1.5"/><circle cx="10" cy="12" r="1" fill="#7000FF"/><circle cx="14" cy="12" r="1" fill="#7000FF"/><ellipse cx="12" cy="14.5" rx="1" ry="0.7" fill="#7000FF"/></svg>`,
        turtle: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="6" ry="5" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><path d="M12 7c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" stroke="#39FF14" stroke-width="1.2"/><circle cx="18.5" cy="12" r="1.5" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><path d="M7 8l-2-2M7 16l-2 2M17 8l2-2M17 16l2 2" stroke="#39FF14" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        bear: `<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5" fill="#0d1117" stroke="#FF007F" stroke-width="1.5"/><circle cx="18" cy="6" r="2.5" fill="#0d1117" stroke="#FF007F" stroke-width="1.5"/><path d="M5 13c0-4 3-6 7-6s7 2 7 6c0 4-3 6-7 6s-7-2-7-6z" fill="#0d1117" stroke="#FF007F" stroke-width="1.5"/><circle cx="9.5" cy="11" r="1" fill="#FF007F"/><circle cx="14.5" cy="11" r="1" fill="#FF007F"/><ellipse cx="12" cy="14" rx="2" ry="1.2" fill="#FF007F"/></svg>`,
        snake: `<svg viewBox="0 0 24 24"><path d="M4 7c0-2 2-3 4-1s2 4 4 4 3-2 5-1 2 3 1 5-2 2-4 1-3-3-5-2-2 3-1 5" stroke="#00F0FF" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="18" cy="12" r="1" fill="#00F0FF"/><path d="M19 12h3l1-1M22 12l1 1" stroke="#FF007F" stroke-width="1.2"/></svg>`,
        elephant: `<svg viewBox="0 0 24 24"><path d="M6 9c0-3.5 2.5-5 6-5s6 1.5 6 5c0 3-1 5-2 6v4h-2v-3h-4v3H8v-4c-1-1-2-3-2-6z" fill="#0d1117" stroke="#FFD700" stroke-width="1.5"/><path d="M6 10C4 10 2 8 2 6s2-1 4 1M18 10c2 0 4-2 4-4s-2-1-4 1" stroke="#FFD700" stroke-width="1.5"/><path d="M12 11v6c0 1.5-1 2.5-2.5 2.5" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round"/><circle cx="9.5" cy="8.5" r="1" fill="#FFD700"/><circle cx="14.5" cy="8.5" r="1" fill="#FFD700"/></svg>`,
        lion: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#0d1117" stroke="#7000FF" stroke-width="1.5"/><path d="M12 2l2 3M12 22l-2-3M2 12l3 2M22 12l-3-2M5 5l3 2M19 19l-3-2M5 19l3-2M19 5l-3 2" stroke="#7000FF" stroke-width="1.2"/><circle cx="9" cy="11" r="1" fill="#7000FF"/><circle cx="15" cy="11" r="1" fill="#7000FF"/><polygon points="12,13 10.5,15 13.5,15" fill="#7000FF"/></svg>`
    }
};
