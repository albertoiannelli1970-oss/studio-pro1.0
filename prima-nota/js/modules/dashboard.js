// Prima Nota Pro 1.0® - Dashboard Module

function renderDashboard() {
    const totals = transManager.getTotals();
    const recent = transManager.getRecent ? transManager.getRecent(5) : [];
    const userName = localStorage.getItem('pn_user_name') || 'Ristorante';
    
    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="width:100%; max-width:1400px;">
            ${window.getCardHeader(`GESTIONE: ${userName}`, "window.logout()")}
            <div style="padding:2.5rem;">
                ${window.renderPageHero(`Ristorante: ${userName}`, "Panoramica finanziaria in tempo reale.", "DASHBOARD")}
                
                <!-- Chart Section -->
                <div class="glass-card" style="padding: 2.5rem; margin-bottom: 3.5rem; background: rgba(255,255,255,0.4); border: 1px solid var(--glass-border); border-radius: 32px;">
                    <h3 style="margin-top:0; margin-bottom: 2rem; color: var(--eco-text-title); display:flex; align-items:center; gap:0.8rem;">
                        <span>📈 Analisi Trend Finanziario</span>
                        <small style="font-size:0.7rem; color:var(--eco-accent); opacity:0.6; text-transform:uppercase; letter-spacing:0.1em;">Dati in Tempo Reale</small>
                    </h3>
                    <div style="height: 300px; width: 100%; display: flex; justify-content: center; align-items: center;">
                        <canvas id="dashboardChart"></canvas>
                    </div>
                </div>

                <div class="stat-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; width: 100%; max-width: 1400px; margin-bottom: 3.5rem;">
                    <div class="stat-card" style="padding: 2.5rem; border-radius: 32px; background: rgba(255,255,255,0.4); border: 1px solid var(--glass-border); border-left:5px solid #27ae60;"><span class="stat-label" style="color: var(--eco-text-body); font-size: 0.9rem; font-weight: 800; text-transform: uppercase;">Entrate Totali</span><span class="stat-value" style="font-size: 2.5rem; font-weight: 800; color: var(--eco-text-title);">€ ${totals.entrate.toLocaleString('it-IT')}</span></div>
                    <div class="stat-card" style="padding: 2.5rem; border-radius: 32px; background: rgba(255,255,255,0.4); border: 1px solid var(--glass-border); border-left:5px solid #e67e22;"><span class="stat-label" style="color: var(--eco-text-body); font-size: 0.9rem; font-weight: 800; text-transform: uppercase;">Uscite Totali</span><span class="stat-value" style="font-size: 2.5rem; font-weight: 800; color: var(--eco-text-title);">€ ${totals.uscite.toLocaleString('it-IT')}</span></div>
                    <div class="stat-card" style="padding: 2.5rem; border-radius: 32px; background: rgba(255,255,255,0.4); border: 1px solid var(--glass-border); border-left:5px solid var(--eco-accent);"><span class="stat-label" style="color: var(--eco-text-body); font-size: 0.9rem; font-weight: 800; text-transform: uppercase;">Saldo Netto</span><span class="stat-value" style="font-size: 2.5rem; font-weight: 800; color: var(--eco-text-title);">€ ${totals.saldo.toLocaleString('it-IT')}</span></div>
                </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; width: 100%; max-width: 1400px; margin-top: 2.5rem;">
            <div class="glass-card" style="padding: 2.5rem; border-radius: 32px; background: rgba(255,255,255,0.4); border: 1px solid var(--glass-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h3 style="margin: 0; font-size: 1.5rem; color: var(--eco-text-title);">Movimenti Recenti</h3>
                    <div style="display: flex; gap: 0.8rem;">
                        <button class="btn-green" style="padding: 0.7rem 1.2rem; font-size: 0.85rem;" onclick="window.showTransactionForm('entrata')">+ ENTRATA</button>
                        <button class="btn-indigo" style="padding: 0.7rem 1.2rem; font-size: 0.85rem; background: #e67e22;" onclick="window.showTransactionForm('uscita')">- USCITA</button>
                    </div>
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
                        <tr style="border-bottom: 1px solid var(--glass-border); color: #64748b; font-weight: 800;">
                            <th style="padding: 1.2rem; text-align: left;">DATA</th>
                            <th style="padding: 1.2rem; text-align: left;">DESCRIZIONE</th>
                            <th style="padding: 1.2rem; text-align: right;">IMPORTO</th>
                        </tr>
                        ${recent.length === 0 ? `<tr><td colspan="3" style="text-align: center; padding: 3rem; color: #64748b;">Nessun movimento registrato.</td></tr>` : recent.map(t => `
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.03);">
                                <td style="padding: 1.2rem;">${new Date(t.date).toLocaleDateString('it-IT')}</td>
                                <td style="padding: 1.2rem;">${t.description}</td>
                                <td style="padding: 1.2rem; text-align: right; font-weight: 800; color: ${t.type === 'entrata' ? '#27ae60' : '#e67e22'};">
                                    ${t.type === 'entrata' ? '+' : '-'} €${t.amount.toLocaleString('it-IT')}
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>

            <div class="glass-card" style="padding: 2.5rem; border-radius: 32px; background: rgba(255,255,255,0.4); border: 1px solid var(--glass-border);">
                <h3 style="margin-bottom: 2rem; font-size: 1.5rem; color: var(--eco-text-title);">Azioni Rapide</h3>
                <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                    <button class="btn-indigo" style="width: 100%; border: 1px solid #27ae60; background: rgba(39, 174, 96, 0.05); color: #27ae60;" onclick="window.syncToCloud()">☁️ SINCRONIZZA CLOUD</button>
                    <button class="btn-indigo" style="width: 100%;" onclick="window.showSection('clienti')">Gestione Clienti</button>
                    <button class="btn-indigo" style="width: 100%; background: var(--eco-accent); opacity: 0.8;" onclick="window.showSection('scadenzario')">Visualizza Scadenze</button>
                    <button class="btn-indigo" style="width: 100%; background: var(--eco-accent); opacity: 0.8;" onclick="window.showSection('stampa')">Report PDF</button>
                </div>
            </div>
        </div>
    `;

    // Delay chart init to ensure DOM is ready
    setTimeout(() => initDashboardChart(totals), 100);
}

function initDashboardChart(totals) {
    const ctx = document.getElementById('dashboardChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (window.myChart) window.myChart.destroy();

    const data = {
        labels: ['Entrate', 'Uscite'],
        datasets: [{
            data: [totals.entrate, totals.uscite],
            backgroundColor: ['#27ae60', '#e67e22'],
            borderColor: 'white',
            borderWidth: 5,
            hoverOffset: 15
        }]
    };

    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            cutout: '70%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#2d3326',
                        font: { family: 'Outfit', size: 14, weight: '600' },
                        padding: 20
                    }
                }
            }
        }
    });
}

window.renderDashboard = renderDashboard;

