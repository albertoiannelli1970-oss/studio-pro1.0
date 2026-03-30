// Prima Nota Pro 1.0® - Inventory Module

function renderInventory() {
    const items = invManager.getItems();
    const userName = localStorage.getItem('pn_user_name') || 'Ristorante';

    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="width:100%; max-width:1400px;">
            ${window.getCardHeader(`INVENTARIO MERCI: ${userName}`, "window.showSection('dashboard')")}
            <div style="padding:2.5rem;">
                ${window.renderPageHero("Monitoraggio Scorte", "Gestisci il magazzino e controlla le giacenze critiche.", "MAGAZZINO")}

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem;">
                    <div style="display: flex; gap: 1rem;">
                        <input type="text" placeholder="Cerca merce..." class="hub-input" style="width: 300px; margin-bottom: 0;" onkeyup="window.filterInventory(this.value)">
                        <select class="hub-input" style="width: 200px; margin-bottom: 0;" onchange="window.filterInventoryByCategory(this.value)">
                            <option value="">Tutte le Categorie</option>
                            <option value="Alimentari">Alimentari</option>
                            <option value="Bevande">Bevande</option>
                            <option value="Materiale Consumo">Materiale Consumo</option>
                        </select>
                    </div>
                    <button class="btn-primary" onclick="window.showInventoryForm()">+ NUOVO ARTICOLO</button>
                </div>

                <div class="glass-card" style="padding:0; overflow:hidden; border-radius: 24px;">
                    <table style="width:100%; border-collapse: collapse;">
                        <thead style="background: rgba(93,102,76,0.05);">
                            <tr style="text-align:left; color: var(--eco-accent); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">
                                <th style="padding: 1.5rem 2rem;">Articolo</th>
                                <th style="padding: 1.5rem 2rem;">Categoria</th>
                                <th style="padding: 1.5rem 2rem; text-align: center;">Giacenza</th>
                                <th style="padding: 1.5rem 2rem; text-align: center;">Sotto Scorta</th>
                                <th style="padding: 1.5rem 2rem; text-align: right;">Azioni</th>
                            </tr>
                        </thead>
                        <tbody id="inventory-table-body">
                            ${items.map(item => renderInventoryRow(item)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderInventoryRow(item) {
    const isLow = item.quantity <= item.minStock;
    return `
        <tr style="border-bottom: 1px solid var(--glass-border); background: ${isLow ? 'rgba(230, 126, 34, 0.05)' : 'transparent'};">
            <td style="padding: 1.5rem 2rem; font-weight: 700; color: var(--eco-text-title);">${item.name}</td>
            <td style="padding: 1.5rem 2rem; opacity: 0.7;">${item.category}</td>
            <td style="padding: 1.5rem 2rem; text-align: center; font-weight: 800; color: ${isLow ? '#e67e22' : 'var(--eco-primary)'};">
                ${item.quantity} ${item.unit}
            </td>
            <td style="padding: 1.5rem 2rem; text-align: center;">
                <span style="padding: 0.4rem 0.8rem; border-radius: 10px; font-size: 0.75rem; font-weight: 800; background: ${isLow ? '#e67e22' : 'rgba(39, 174, 96, 0.1)'}; color: ${isLow ? 'white' : '#27ae60'};">
                    ${isLow ? 'CRITICO' : 'OK'}
                </span>
            </td>
            <td style="padding: 1.5rem 2rem; text-align: right;">
                <button class="win-dot yellow" title="Modifica" onclick="window.showInventoryForm(${item.id})"></button>
                <button class="win-dot green" title="Carica/Scarica" onclick="window.showStockUpdate(${item.id})"></button>
            </td>
        </tr>
    `;
}

window.renderInventory = renderInventory;
window.showInventoryForm = (id = null) => {
    alert("Modulo in fase di attivazione: Form Articolo");
};
window.showStockUpdate = (id) => {
    const qty = prompt("Quantità da aggiungere (usa negativo per scaricare):");
    if (qty && !isNaN(qty)) {
        invManager.updateQuantity(id, qty);
        renderInventory();
    }
};
