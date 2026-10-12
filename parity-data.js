// ==========================================================================
// 11th Floor Parity — Daily Dataset & Curated Vector Pairs
// Theme: "Retro Arcade & Synthwave Odyssey" (10 Sequential Floors)
// ==========================================================================

window.PARITY_DAILY_SET = {
    title: "Retro Arcade & Synthwave Odyssey",
    floors: [
        { floor: 1, pairs: 1, timeLimit: 12, icons: ["joystick"] },
        { floor: 2, pairs: 2, timeLimit: 16, icons: ["joystick", "floppy_disk"] },
        { floor: 3, pairs: 3, timeLimit: 22, icons: ["joystick", "floppy_disk", "neon_cassette"] },
        { floor: 4, pairs: 4, timeLimit: 28, icons: ["joystick", "floppy_disk", "neon_cassette", "space_invader"] },
        { floor: 5, pairs: 5, timeLimit: 34, icons: ["joystick", "floppy_disk", "neon_cassette", "space_invader", "arcade_cabinet"] },
        { floor: 6, pairs: 6, timeLimit: 40, icons: ["joystick", "floppy_disk", "neon_cassette", "space_invader", "arcade_cabinet", "synth_keytar"] },
        { floor: 7, pairs: 7, timeLimit: 46, icons: ["joystick", "floppy_disk", "neon_cassette", "space_invader", "arcade_cabinet", "synth_keytar", "vector_grid_sun"] },
        { floor: 8, pairs: 8, timeLimit: 52, icons: ["joystick", "floppy_disk", "neon_cassette", "space_invader", "arcade_cabinet", "synth_keytar", "vector_grid_sun", "game_cartridge"] },
        { floor: 9, pairs: 9, timeLimit: 58, icons: ["joystick", "floppy_disk", "neon_cassette", "space_invader", "arcade_cabinet", "synth_keytar", "vector_grid_sun", "game_cartridge", "vr_goggles"] },
        { floor: 10, pairs: 10, timeLimit: 64, icons: ["joystick", "floppy_disk", "neon_cassette", "space_invader", "arcade_cabinet", "synth_keytar", "vector_grid_sun", "game_cartridge", "vr_goggles", "pixel_crown"] }
    ],
    svgMap: {
        joystick: `<svg viewBox="0 0 24 24"><path d="M6 15h12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4z" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><circle cx="12" cy="7" r="3" fill="#39FF14"/><line x1="12" y1="10" x2="12" y2="15" stroke="#39FF14" stroke-width="2"/></svg>`,
        floppy_disk: `<svg viewBox="0 0 24 24"><path d="M4 4h13l3 3v13H4V4z" fill="#0d1117" stroke="#00F0FF" stroke-width="1.5"/><rect x="8" y="4" width="8" height="5" fill="#00F0FF"/><rect x="6" y="13" width="12" height="7" fill="none" stroke="#00F0FF" stroke-width="1.5"/></svg>`,
        neon_cassette: `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="#0d1117" stroke="#FF007F" stroke-width="1.5"/><circle cx="8" cy="12" r="2" stroke="#FF007F" stroke-width="1.5"/><circle cx="16" cy="12" r="2" stroke="#FF007F" stroke-width="1.5"/><line x1="10" y1="12" x2="14" y2="12" stroke="#FF007F" stroke-width="1.5"/></svg>`,
        space_invader: `<svg viewBox="0 0 24 24"><path d="M6 6h12v3H6V6zm-2 3h16v3H4V9zm-1 3h18v3H3v-3zm3 3h3v3H6v-3zm9 0h3v3h-3v-3z" fill="#FFD700"/><circle cx="8" cy="11" r="1" fill="#0d1117"/><circle cx="16" cy="11" r="1" fill="#0d1117"/></svg>`,
        arcade_cabinet: `<svg viewBox="0 0 24 24"><path d="M6 3h12l1 5-2 3 1 10H6L7 11 5 8l1-5z" fill="#0d1117" stroke="#7000FF" stroke-width="1.5"/><rect x="8" y="5" width="8" height="4" fill="none" stroke="#7000FF" stroke-width="1.5"/><circle cx="10" cy="14" r="1" fill="#7000FF"/><line x1="13" y1="14" x2="16" y2="14" stroke="#7000FF" stroke-width="1.5"/></svg>`,
        synth_keytar: `<svg viewBox="0 0 24 24"><path d="M3 16l14-8 4 2-12 9-6-3z" fill="#0d1117" stroke="#ff9999" stroke-width="1.5"/><line x1="8" y1="13" x2="10" y2="17" stroke="#ff9999" stroke-width="1.5"/><line x1="11" y1="11" x2="13" y2="15" stroke="#ff9999" stroke-width="1.5"/><line x1="14" y1="9" x2="16" y2="13" stroke="#ff9999" stroke-width="1.5"/></svg>`,
        vector_grid_sun: `<svg viewBox="0 0 24 24"><path d="M12 3a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" fill="#FF007F"/><line x1="2" y1="14" x2="22" y2="14" stroke="#00F0FF" stroke-width="1.5"/><line x1="4" y1="18" x2="20" y2="18" stroke="#00F0FF" stroke-width="1.5"/><line x1="12" y1="10" x2="2" y2="21" stroke="#00F0FF" stroke-width="1.5"/><line x1="12" y1="10" x2="22" y2="21" stroke="#00F0FF" stroke-width="1.5"/></svg>`,
        game_cartridge: `<svg viewBox="0 0 24 24"><path d="M5 3h14v15l-2 3H7l-2-3V3z" fill="#0d1117" stroke="#FFD700" stroke-width="1.5"/><rect x="8" y="6" width="8" height="6" fill="none" stroke="#FFD700" stroke-width="1.5"/><line x1="8" y1="18" x2="16" y2="18" stroke="#FFD700" stroke-width="2"/></svg>`,
        vr_goggles: `<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="3" fill="#0d1117" stroke="#39FF14" stroke-width="1.5"/><circle cx="8" cy="12" r="2.5" stroke="#39FF14" stroke-width="1.5"/><circle cx="16" cy="12" r="2.5" stroke="#39FF14" stroke-width="1.5"/><path d="M3 10c2-2 4-2 6-2h6c2 0 4 0 6 2" stroke="#39FF14" stroke-width="1.5"/></svg>`,
        pixel_crown: `<svg viewBox="0 0 24 24"><path d="M4 18h16V8l-4 3-4-5-4 5-4-3v10z" fill="#0d1117" stroke="#00F0FF" stroke-width="1.5"/><circle cx="4" cy="7" r="1" fill="#00F0FF"/><circle cx="12" cy="5" r="1" fill="#00F0FF"/><circle cx="20" cy="7" r="1" fill="#00F0FF"/></svg>`
    }
};
