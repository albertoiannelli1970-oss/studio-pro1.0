// Prima Nota Pro 1.0® - Dashboard Module

function renderDashboard() {
    const totals = transManager.getTotals();
    const recent = transManager.getRecent(5);
    const userName = localStorage.getItem('pn_user_name') || 'Utente';

    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="margin-bottom: 2rem;">
            ${getCardHeader('DASHBOARD PRINCIPALE', 'window.logout()')}
            <div style="padding: 2rem;">
                ${renderPageHero(`Benvenuto, ${userName}`, 'Bentornato nell\'ecosistema gestionale del futuro.', 'dashboard')}
            </div>
        </div>
        
        <div class="dashboard-grid fade-in">
            <div class="glass-card stat-card" style="border-left: 4px solid var(--pn-green);">
                <span class="stat-label">Entrate Totali</span>
                <span class="stat-value">€ ${totals.entrate.toLocaleString('it-IT')}</span>
            </div>
            <div class="glass-card stat-card" style="border-left: 4px solid var(--pn-red);">
                <span class="stat-label">Uscite Totali</span>
                <span class="stat-value">€ ${totals.uscite.toLocaleString('it-IT')}</span>
            </div>
            <div class="glass-card stat-card" style="border-left: 4px solid var(--pn-indigo);">
                <span class="stat-label">Saldo Attuale</span>
                <span class="stat-value">€ ${totals.saldo.toLocaleString('it-IT')}</span>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; width: 100%; max-width: 1200px; margin-top: 2.5rem;">
            <div class="glass-card" style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0;">Movimenti Recenti</h3>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-green" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="window.showTransactionForm('entrata')">+ ENTRATA</button>
                        <button class="btn-indigo" style="padding: 0.5rem 1rem; font-size: 0.85rem; background: var(--pn-red);" onclick="window.showTransactionForm('uscita')">- USCITA</button>
                    </div>
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <tr style="border-bottom: 1px solid var(--glass-border); color: #64748b;">
                            <th style="padding: 1rem; text-align: left;">DATA</th>
                            <th style="padding: 1rem; text-align: left;">DESCRIZIONE</th>
                            <th style="padding: 1rem; text-align: right;">IMPORTO</th>
                        </tr>
                        ${recent.length === 0 ? `<tr><td colspan="3" style="text-align: center; padding: 2rem; color: #64748b;">Nessun movimento registrato.</td></tr>` : recent.map(t => `
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                                <td style="padding: 1rem;">${new Date(t.date).toLocaleDateString('it-IT')}</td>
                                <td style="padding: 1rem;">${t.description}</td>
                                <td style="padding: 1rem; text-align: right; font-weight: 700; color: ${t.type === 'entrata' ? 'var(--pn-green)' : 'var(--pn-red)'};">
                                    ${t.type === 'entrata' ? '+' : '-'} €${t.amount.toLocaleString('it-IT')}
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>

            <div class="glass-card" style="padding: 1.5rem;">
                <h3 style="margin-bottom: 1.5rem;">Azioni Rapide</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <button class="btn-indigo" style="width: 100%; border-color: var(--pn-green); color: var(--pn-green);" onclick="window.syncToCloud()">☁️ SINCRONIZZA CLOUD</button>
                    <button class="btn-indigo" style="width: 100%;" onclick="window.showSection('clienti')">Gestione Clienti</button>
                    <button class="btn-indigo" style="width: 100%; background: var(--pn-slate-700); color: #94a3b8;" onclick="window.showSection('scadenzario')">Visualizza Scadenze</button>
                    <button class="btn-indigo" style="width: 100%; background: var(--pn-slate-700); color: #94a3b8;" onclick="window.showSection('stampa')">Report PDF</button>
                </div>
            </div>
        </div>
    `;
}
