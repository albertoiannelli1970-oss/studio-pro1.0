// Prima Nota Pro 1.0® - Suppliers Module (Fully Active)

function renderSuppliers() {
    const suppliers = supplierManager.getSuppliers();
    const orders = supplierManager.getOrders();
    const userName = localStorage.getItem('pn_user_name') || 'Ristorante';

    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="width:100%; max-width:1400px;">
            ${window.getCardHeader(`ORDINI FORNITORI: ${userName}`, "window.showSection('dashboard')")}
            <div style="padding:2.5rem;">
                ${window.renderPageHero("Gestione Approvvigionamenti", "Monitora gli ordini e gestisci i contatti dei tuoi fornitori.", "FORNITORI")}

                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2.5rem;">
                    <!-- Suppliers List -->
                    <div class="glass-card" style="padding: 2rem; border-radius: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3 style="margin: 0; font-size: 1.2rem;">Lista Fornitori</h3>
                            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.75rem; border-radius:10px;" onclick="window.showNewSupplierForm()">+ NUOVO</button>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            ${suppliers.length === 0 ? '<p style="opacity:0.5; text-align:center; padding:2rem;">Nessun fornitore. Aggiungi il primo!</p>' : suppliers.map(s => `
                                <div style="padding: 1.2rem; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <div>
                                            <div style="font-weight: 800; color: var(--eco-text-title);">${s.name}</div>
                                            <div style="font-size: 0.8rem; opacity: 0.6; margin-top: 0.2rem;">${s.contact} • ${s.category}</div>
                                        </div>
                                        <button class="win-dot red" title="Elimina" onclick="window.deleteSupplier(${s.id})"></button>
                                    </div>
                                    <button class="btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.5rem; font-size: 0.75rem; border-radius:10px;" onclick="window.showNewOrderForm(${s.id})">NUOVO ORDINE</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Orders History -->
                    <div class="glass-card" style="padding: 2rem; border-radius: 24px;">
                        <h3 style="margin-bottom: 1.5rem; font-size: 1.2rem;">Storico Ordini</h3>
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead style="background: rgba(93,102,76,0.05);">
                                    <tr style="text-align:left; color: var(--eco-accent); font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">
                                        <th style="padding: 1rem;">Data</th>
                                        <th style="padding: 1rem;">Fornitore</th>
                                        <th style="padding: 1rem;">Articoli</th>
                                        <th style="padding: 1rem; text-align: right;">Totale</th>
                                        <th style="padding: 1rem; text-align: center;">Stato</th>
                                        <th style="padding: 1rem;">Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${orders.length === 0 ? '<tr><td colspan="6" style="text-align:center; padding: 2.5rem; opacity: 0.5;">Nessun ordine registrato.</td></tr>' : orders.slice().reverse().map(o => {
                                        const sup = suppliers.find(s => s.id == o.supplierId);
                                        const statusColor = o.status === 'Consegnato' ? '#27ae60' : o.status === 'Annullato' ? '#e53935' : '#e67e22';
                                        return `
                                        <tr style="border-bottom: 1px solid var(--glass-border);">
                                            <td style="padding: 1rem;">${new Date(o.date).toLocaleDateString('it-IT')}</td>
                                            <td style="padding: 1rem; font-weight:700;">${sup?.name || 'N/A'}</td>
                                            <td style="padding: 1rem; font-size:0.8rem; opacity:0.7;">${o.items || '-'}</td>
                                            <td style="padding: 1rem; text-align: right; font-weight: 800;">€ ${o.total.toLocaleString('it-IT')}</td>
                                            <td style="padding: 1rem; text-align: center;">
                                                <select style="padding:0.3rem 0.5rem; border-radius:8px; border:1px solid var(--glass-border); font-size:0.7rem; font-weight:800; background:${statusColor}; color:white; cursor:pointer;" onchange="window.updateOrderStatus(${o.id}, this.value)">
                                                    <option value="Pendente" ${o.status==='Pendente'?'selected':''}>Pendente</option>
                                                    <option value="Consegnato" ${o.status==='Consegnato'?'selected':''}>Consegnato</option>
                                                    <option value="Annullato" ${o.status==='Annullato'?'selected':''}>Annullato</option>
                                                </select>
                                            </td>
                                            <td style="padding: 1rem;">
                                                <button class="win-dot red" title="Elimina" onclick="window.deleteOrder(${o.id})"></button>
                                            </td>
                                        </tr>`;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- Supplier Form ---
window.showNewSupplierForm = () => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width:500px;">
            ${window.getCardHeader('NUOVO FORNITORE', 'this.closest(".modal-overlay").remove()')}
            <div style="padding:2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <div><label class="input-label">Nome Azienda *</label><input class="pn-input" id="sup-name" placeholder="Es. Global Food SpA"></div>
                <div><label class="input-label">Contatto</label><input class="pn-input" id="sup-contact" placeholder="Es. Mario Rossi"></div>
                <div><label class="input-label">Categoria</label>
                    <select class="pn-input" id="sup-category">
                        <option>Alimentari</option><option>Bevande</option><option>Materiale Consumo</option><option>Pulizia</option><option>Attrezzature</option><option>Altro</option>
                    </select>
                </div>
                <button class="btn-primary" style="width:100%; margin-top:0.5rem;" onclick="window.saveNewSupplier()">SALVA FORNITORE</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.saveNewSupplier = () => {
    const name = document.getElementById('sup-name').value.trim();
    if (!name) return alert('Inserisci il nome del fornitore.');
    const contact = document.getElementById('sup-contact').value.trim() || '-';
    const category = document.getElementById('sup-category').value;
    supplierManager.suppliers.push({ id: Date.now(), name, contact, category });
    supplierManager.save();
    document.querySelector('.modal-overlay').remove();
    renderSuppliers();
};

window.deleteSupplier = (id) => {
    if (confirm('Eliminare questo fornitore?')) {
        supplierManager.suppliers = supplierManager.suppliers.filter(s => s.id !== id);
        supplierManager.save();
        renderSuppliers();
    }
};

// --- Order Form ---
window.showNewOrderForm = (supplierId) => {
    const sup = supplierManager.getSuppliers().find(s => s.id === supplierId);
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width:550px;">
            ${window.getCardHeader(`NUOVO ORDINE: ${sup?.name || ''}`, 'this.closest(".modal-overlay").remove()')}
            <div style="padding:2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <div><label class="input-label">Articoli / Descrizione *</label><textarea class="pn-input" id="ord-items" rows="3" placeholder="Es. 50kg Farina, 20L Olio EVO..." style="min-height:80px; resize:vertical;"></textarea></div>
                <div><label class="input-label">Totale Ordine (€) *</label><input type="number" class="pn-input" id="ord-total" placeholder="0.00" step="0.01"></div>
                <div><label class="input-label">Stato</label>
                    <select class="pn-input" id="ord-status">
                        <option>Pendente</option><option>Consegnato</option>
                    </select>
                </div>
                <button class="btn-primary" style="width:100%; margin-top:0.5rem;" onclick="window.saveNewOrder(${supplierId})">CONFERMA ORDINE</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.saveNewOrder = (supplierId) => {
    const items = document.getElementById('ord-items').value.trim();
    const total = parseFloat(document.getElementById('ord-total').value);
    const status = document.getElementById('ord-status').value;
    if (!items || isNaN(total) || total <= 0) return alert('Compila tutti i campi obbligatori.');
    supplierManager.orders.push({ id: Date.now(), supplierId, items, total, date: new Date().toISOString(), status });
    supplierManager.save();
    document.querySelector('.modal-overlay').remove();
    renderSuppliers();
};

window.updateOrderStatus = (orderId, newStatus) => {
    const order = supplierManager.orders.find(o => o.id === orderId);
    if (order) { order.status = newStatus; supplierManager.save(); renderSuppliers(); }
};

window.deleteOrder = (orderId) => {
    if (confirm('Eliminare questo ordine?')) {
        supplierManager.orders = supplierManager.orders.filter(o => o.id !== orderId);
        supplierManager.save();
        renderSuppliers();
    }
};

window.renderSuppliers = renderSuppliers;
