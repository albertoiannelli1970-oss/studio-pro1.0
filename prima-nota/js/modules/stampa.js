// Prima Nota Pro 1.0® - Stampa Module

function renderStampa() {
    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="margin-bottom: 2rem;">
            ${getCardHeader('CENTRO STAMPA & REPORT', 'window.renderDashboard()')}
            <div style="padding: 2.5rem;">
                ${renderPageHero('Centro Stampa & Report', 'Genera documenti professionali e reportistica dettagliata dei tuoi flussi.', 'stampa')}
                <div class="glass-card" style="padding: 4rem; text-align: center; border: 1px dashed rgba(255,255,255,0.1); margin-top: 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 2rem; opacity: 0.3;">📄</div>
                    <h3 style="color: #64748b; margin-bottom: 1rem;">Generatore Report PDF</h3>
                    <p style="color: #475569; max-width: 500px; margin: 0 auto;">Crea estratti conto, bilanci preventivi e riepiloghi fiscali pronti per la stampa o l'invio digitale.</p>
                    <div style="margin-top: 3rem; display: flex; justify-content: center; gap: 1rem;">
                        <button class="btn-indigo" onclick="window.generatePDF('Bilancio d\\'Esercizio')">🖨️ GENERA REPORT PDF</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
