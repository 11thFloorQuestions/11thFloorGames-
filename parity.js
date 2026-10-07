async function populateVault() {
    if (!vaultList) return;
    vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">Loading Archives...</div>';
    
    const fetchPromises = [];

    for (let i = 1; i <= 50; i++) {
        const paddedId = String(i).padStart(2, '0');
        const unpaddedId = String(i);
        
        // Fetch attempt: check padded first ("08"), then unpadded ("8")
        const fetchSingleArchive = (async () => {
            let data = await fetchFileWithFallbacks(`sandbox-parity.${paddedId}.json`);
            if (!data) {
                data = await fetchFileWithFallbacks(`sandbox-parity.${unpaddedId}.json`);
            }
            return { id: paddedId, data };
        })();

        fetchPromises.push(fetchSingleArchive);
    }

    const results = await Promise.all(fetchPromises);
    const buttons = [];

    results.forEach(({ id, data }) => {
        if (data && data.floors) {
            const btn = document.createElement('button');
            btn.className = 'vault-item-btn';
            btn.innerHTML = `<strong>Archive ${id}</strong>`;
            bindInteraction(btn, () => loadVaultSet(data));
            buttons.push(btn);
        }
    });

    vaultList.innerHTML = '';
    if (buttons.length === 0) {
        vaultList.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; padding: 10px;">No archives found.</div>';
    } else {
        buttons.forEach(btn => vaultList.appendChild(btn));
    }
}
