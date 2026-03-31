// Prima Nota Pro 1.0® - Inventory Module (Fully Active)

function renderInventory() {
    const items = invManager.getItems();
    const userName = localStorage.getItem('pn_user_name') || 'Ristorante';

    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="width:100%; max-width:1400px;">
            ${window.getCardHeader(`INVENTARIO MERCI: ${userName}`, "window.showSection('dashboard')")}
            <div style="padding:2.5rem;">
                ${window.renderPageHero("Monitoraggio Scorte", "Gestisci il magazzino e controlla le giacenze critiche.", "MAGAZZINO")}

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap:wrap; gap:1rem;">
                    <div style="display: flex; gap: 1rem; flex-wrap:wrap;">
                        <input type="text" placeholder="Cerca merce..." class="pn-input" style="width: 250px; margin-bottom: 0;" id="inv-search" onkeyup="window.filterInventory(this.value)">
                        <select class="pn-input" style="width: 200px; margin-bottom: 0;" onchange="window.filterInventoryByCategory(this.value)">
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
                            ${items.length === 0 ? '<tr><td colspan="5" style="text-align:center; padding:3rem; opacity:0.5;">Nessun articolo in inventario.</td></tr>' : items.map(item => renderInventoryRow(item)).join('')}
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
            <td style="padding: 1.5rem 2rem; text-align: center; font-weight: 800; color: ${isLow ? '#e67e22' : 'var(--eco-accent)'};">
                ${item.quantity} ${item.unit}
            </td>
            <td style="padding: 1.5rem 2rem; text-align: center;">
                <span style="padding: 0.4rem 0.8rem; border-radius: 10px; font-size: 0.75rem; font-weight: 800; background: ${isLow ? '#e67e22' : 'rgba(39, 174, 96, 0.1)'}; color: ${isLow ? 'white' : '#27ae60'};">
                    ${isLow ? 'CRITICO' : 'OK'}
                </span>
            </td>
            <td style="padding: 1.5rem 2rem; text-align: right; display:flex; gap:0.5rem; justify-content:flex-end;">
                <button class="btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.7rem; border-radius:8px;" onclick="window.showInventoryForm(${item.id})">✏️ Modifica</button>
                <button class="btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.7rem; border-radius:8px;" onclick="window.showStockUpdate(${item.id})">📦 Carica/Scarica</button>
                <button class="win-dot red" title="Elimina" onclick="window.deleteInventoryItem(${item.id})"></button>
            </td>
        </tr>
    `;
}

// --- Inventory Form ---
window.showInventoryForm = (id = null) => {
    const item = id ? invManager.getItems().find(i => i.id === id) : {};
    const isEdit = !!id;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width:550px;">
            ${window.getCardHeader(isEdit ? 'MODIFICA ARTICOLO' : 'NUOVO ARTICOLO', 'this.closest(".modal-overlay").remove()')}
            <div style="padding:2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <div><label class="input-label">Nome Articolo *</label><input class="pn-input" id="inv-name" value="${item.name||''}" placeholder="Es. Farina Tipo 0"></div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div><label class="input-label">Quantità *</label><input type="number" class="pn-input" id="inv-qty" value="${item.quantity||''}" placeholder="0" step="0.1"></div>
                    <div><label class="input-label">Unità</label><input class="pn-input" id="inv-unit" value="${item.unit||'kg'}" placeholder="kg, L, pz..."></div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div><label class="input-label">Scorta Minima</label><input type="number" class="pn-input" id="inv-min" value="${item.minStock||10}" step="1"></div>
                    <div><label class="input-label">Categoria</label>
                        <select class="pn-input" id="inv-cat">
                            <option ${item.category==='Alimentari'?'selected':''}>Alimentari</option>
                            <option ${item.category==='Bevande'?'selected':''}>Bevande</option>
                            <option ${item.category==='Materiale Consumo'?'selected':''}>Materiale Consumo</option>
                            <option ${item.category==='Attrezzature'?'selected':''}>Attrezzature</option>
                            <option ${item.category==='Altro'?'selected':''}>Altro</option>
                        </select>
                    </div>
                </div>
                <button class="btn-primary" style="width:100%; margin-top:0.5rem;" onclick="window.saveInventoryItem(${id || 'null'})">${isEdit ? 'SALVA MODIFICHE' : 'AGGIUNGI ARTICOLO'}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.saveInventoryItem = (id) => {
    const nameValid = window.Validator.validateField('inv-name', 'text');
    const qtyValid = window.Validator.validateField('inv-qty', 'money');
    
    if (!nameValid || !qtyValid) {
        window.showToast("Controlla i campi evidenziati in rosso", "error");
        return;
    }

    const name = document.getElementById('inv-name').value.trim();
    const quantity = parseFloat(document.getElementById('inv-qty').value);
    const unit = document.getElementById('inv-unit').value.trim() || 'kg';
    const minStock = parseFloat(document.getElementById('inv-min').value) || 10;
    const category = document.getElementById('inv-cat').value;

    if (id) {
        const item = invManager.items.find(i => i.id === id);
        if (item) { 
            Object.assign(item, { name, quantity, unit, minStock, category, updatedAt: new Date().toISOString() }); 
            invManager.save(); 
            window.showToast("Articolo aggiornato", "success");
        }
    } else {
        invManager.addItem(name, quantity, unit, minStock, category);
    }
    document.querySelector('.modal-overlay').remove();
    renderInventory();
};

window.showStockUpdate = (id) => {
    const item = invManager.getItems().find(i => i.id === id);
    if (!item) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width:420px;">
            ${window.getCardHeader(`CARICA/SCARICA: ${item.name}`, 'this.closest(".modal-overlay").remove()')}
            <div style="padding:2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <p style="opacity:0.7; text-align:center;">Giacenza attuale: <strong>${item.quantity} ${item.unit}</strong></p>
                <div><label class="input-label">Quantità (usa negativo per scaricare)</label><input type="number" class="pn-input" id="stock-change" placeholder="Es. +10 o -5" step="0.1"></div>
                <button class="btn-primary" style="width:100%;" onclick="window.applyStockChange(${id})">APPLICA</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.applyStockChange = (id) => {
    if (!window.Validator.validateField('stock-change', 'money')) {
        window.showToast("Inserisci una quantità valida", "error");
        return;
    }
    const change = parseFloat(document.getElementById('stock-change').value);
    invManager.updateQuantity(id, change);
    window.showToast(`Giacenza aggiornata (${change > 0 ? '+' : ''}${change})`, "success");
    document.querySelector('.modal-overlay').remove();
    renderInventory();
};

window.deleteInventoryItem = (id) => {
    if (confirm('Eliminare questo articolo?')) {
        invManager.items = invManager.items.filter(i => i.id !== id);
        invManager.save();
        renderInventory();
    }
};

window.filterInventory = (query) => {
    const items = invManager.getItems().filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
    document.getElementById('inventory-table-body').innerHTML = items.length === 0 
        ? '<tr><td colspan="5" style="text-align:center; padding:3rem; opacity:0.5;">Nessun risultato.</td></tr>'
        : items.map(i => renderInventoryRow(i)).join('');
};

window.filterInventoryByCategory = (cat) => {
    const items = cat ? invManager.getItems().filter(i => i.category === cat) : invManager.getItems();
    document.getElementById('inventory-table-body').innerHTML = items.length === 0 
        ? '<tr><td colspan="5" style="text-align:center; padding:3rem; opacity:0.5;">Nessun risultato.</td></tr>'
        : items.map(i => renderInventoryRow(i)).join('');
};

window.renderInventory = renderInventory;
