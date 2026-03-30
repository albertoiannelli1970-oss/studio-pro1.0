// Prima Nota Pro 1.0® - Suppliers Module

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
                            <button class="btn-indigo" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">+ NUOVO</button>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            ${suppliers.map(s => `
                                <div style="padding: 1.2rem; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);">
                                    <div style="font-weight: 800; color: var(--eco-text-title);">${s.name}</div>
                                    <div style="font-size: 0.8rem; opacity: 0.6; margin-top: 0.2rem;">${s.contact} • ${s.category}</div>
                                    <button class="btn-indigo" style="width: 100%; margin-top: 1rem; padding: 0.5rem; font-size: 0.75rem;" onclick="window.newOrderForm(${s.id})">NUOVO ORDINE</button>
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
                                        <th style="padding: 1rem; text-align: right;">Totale</th>
                                        <th style="padding: 1rem; text-align: center;">Stato</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${orders.length === 0 ? '<tr><td colspan="4" style="text-align:center; padding: 2.5rem; opacity: 0.5;">Nessun ordine trovato.</td></tr>' : orders.map(o => `
                                        <tr style="border-bottom: 1px solid var(--glass-border);">
                                            <td style="padding: 1rem;">${new Date(o.date).toLocaleDateString('it-IT')}</td>
                                            <td style="padding: 1rem;">${suppliers.find(s => s.id == o.supplierId)?.name || 'N/A'}</td>
                                            <td style="padding: 1rem; text-align: right; font-weight: 800;">€ ${o.total.toLocaleString('it-IT')}</td>
                                            <td style="padding: 1rem; text-align: center;">
                                                <span style="padding: 0.3rem 0.6rem; border-radius: 8px; font-size: 0.7rem; font-weight: 800; background: #e67e22; color: white;">${o.status}</span>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.renderSuppliers = renderSuppliers;
window.newOrderForm = (supplierId) => {
    alert("Funzionalità in attivazione: Selezione Articoli per Ordine Fornitore");
};
