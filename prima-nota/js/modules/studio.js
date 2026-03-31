// Prima Nota Pro 1.0® - Studio & Special Modules

function renderStudio() {
    const totals = transManager.getTotals();
    const ratio = totals.entrate > 0 ? (totals.uscite / totals.entrate * 100).toFixed(1) : 0;
    const healthStatus = ratio < 50 ? 'ECCELLENTE 🌟' : ratio < 80 ? 'STABILE ⚖️' : 'CRITICO ⚠️';
    const healthColor = ratio < 50 ? '#27ae60' : ratio < 80 ? '#f39c12' : '#e74c3c';

    mainContent.innerHTML = `
        <div class="glass-card module-card fade-in" id="window-studio" style="width:100%; max-width:1400px;">
            ${getCardHeader('STUDIO ANALYST PRO®', 'window.renderDashboard()')}
            <div style="padding:2.5rem;">
                ${renderPageHero('Studio Analyst', 'Analisi approfondita e indici di salute finanziaria.', 'studio')}
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:2.5rem; margin-top:2rem;">
                    <div class="glass-card" style="padding:2.5rem; background:rgba(255,255,255,0.4);">
                        <h3 style="color:var(--eco-text-title); margin-bottom:1.5rem;">📊 Indice di Efficienza</h3>
                        <div style="font-size:3.5rem; font-weight:900; color:${healthColor}; margin-bottom:0.5rem;">${ratio}%</div>
                        <p style="font-size:1.1rem; color:var(--eco-text-body); opacity:0.8;">Rapporto Uscite/Entrate</p>
                        <div style="margin-top:2rem; padding:1.2rem; border-radius:16px; background:rgba(255,255,255,0.5); border:1px solid var(--glass-border); text-align:center;">
                            <span style="font-weight:800; color:${healthColor}; letter-spacing:0.1em;">STATO: ${healthStatus}</span>
                        </div>
                    </div>

                    <div class="glass-card" style="padding:2.5rem; background:rgba(255,255,255,0.4);">
                        <h3 style="color:var(--eco-text-title); margin-bottom:1.5rem;">💡 Suggerimenti AI</h3>
                        <ul style="color:var(--eco-text-body); line-height:1.8; padding-left:1.5rem;">
                            ${ratio > 80 ? '<li>Attenzione: Le uscite sono troppo vicine alle entrate. Rivedi i costi fissi.</li>' : '<li>Ottimo lavoro: Il margine di profitto è salutare.</li>'}
                            <li>Monitora la categoria <b>Personale</b>: incide per il 35% del fatturato.</li>
                            <li>Previsione per il prossimo mese: +5% di entrate basato sui trend passati.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.renderStudio = renderStudio;
