// Prima Nota Pro 1.0® - Stampa Module

function renderStampa() {
    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="width:100%; max-width:1400px;">
            ${getCardHeader('CENTRO STAMPA & REPORT', 'window.renderDashboard()')}
            <div style="padding: 2.5rem;">
                ${renderPageHero('Centro Stampa & Report', 'Genera documenti professionali e reportistica dettagliata dei tuoi flussi.', 'stampa')}
                
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap:2rem; margin-top:2rem;">
                    <!-- Financial Report -->
                    <div class="glass-card" style="padding:2.5rem; background:rgba(255,255,255,0.4); text-align:center;">
                        <div style="font-size:3.5rem; margin-bottom:1.5rem;">📊</div>
                        <h3 style="color:var(--eco-text-title); margin-bottom:1rem;">Bilancio d'Esercizio</h3>
                        <p style="font-size:0.95rem; color:var(--eco-text-body); opacity:0.8; margin-bottom:2rem;">Riepilogo completo di entrate, uscite e saldo netto periodico.</p>
                        <button class="btn-primary" style="width:100%;" onclick="window.generatePDF('Bilancio d\\'Esercizio')">🖨️ GENERA PDF</button>
                    </div>

                    <!-- Resources Report -->
                    <div class="glass-card" style="padding:2.5rem; background:rgba(255,255,255,0.4); text-align:center;">
                        <div style="font-size:3.5rem; margin-bottom:1.5rem;">📋</div>
                        <h3 style="color:var(--eco-text-title); margin-bottom:1rem;">Anagrafe Risorse</h3>
                        <p style="font-size:0.95rem; color:var(--eco-text-body); opacity:0.8; margin-bottom:2rem;">Export del piano dei conti e delle sottocategorie/risorse aziendali.</p>
                        <button class="btn-primary" style="width:100%;" onclick="window.generatePDF('Anagrafe Risorse')">🖨️ GENERA PDF</button>
                    </div>

                    <!-- CRM Report -->
                    <div class="glass-card" style="padding:2.5rem; background:rgba(255,255,255,0.4); text-align:center;">
                        <div style="font-size:3.5rem; margin-bottom:1.5rem;">👥</div>
                        <h3 style="color:var(--eco-text-title); margin-bottom:1rem;">Anagrafe Clienti</h3>
                        <p style="font-size:0.95rem; color:var(--eco-text-body); opacity:0.8; margin-bottom:2rem;">Elenco contatti e anagrafica completa del modulo CRM.</p>
                        <button class="btn-primary" style="width:100%;" onclick="window.generatePDF('Anagrafe Clienti')">🖨️ GENERA PDF</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.renderStampa = renderStampa;

window.generatePDF = (reportType) => {
    const totals = transManager.getTotals();
    const categories = catManager.getCategories();
    const clients = clientManager.getClients();
    const userName = localStorage.getItem('pn_user_name') || 'Ristorante';
    let bodyHtml = '';

    if (reportType === "Bilancio d'Esercizio") {
        const recent = transManager.getRecent(50);
        const rows = recent.map(t => `<tr><td>${new Date(t.date).toLocaleDateString('it-IT')}</td><td>${t.type==='entrata'?'📈 Entrata':'📉 Uscita'}</td><td>${t.category}</td><td>${t.description||'-'}</td><td style="text-align:right; color:${t.type==='entrata'?'#27ae60':'#e74c3c'}; font-weight:bold;">€ ${t.amount.toLocaleString('it-IT')}</td></tr>`).join('');
        bodyHtml = `<h1>📊 Bilancio d'Esercizio — ${userName}</h1>
        <div style="display:flex; gap:2rem; margin-bottom:2rem;">
            <div style="padding:1rem 2rem; background:#f5f5f5; border-radius:8px;"><strong>Entrate:</strong> € ${totals.entrate.toLocaleString('it-IT')}</div>
            <div style="padding:1rem 2rem; background:#f5f5f5; border-radius:8px;"><strong>Uscite:</strong> € ${totals.uscite.toLocaleString('it-IT')}</div>
            <div style="padding:1rem 2rem; background:#f5f5f5; border-radius:8px;"><strong>Saldo:</strong> € ${totals.saldo.toLocaleString('it-IT')}</div>
        </div>
        <table><thead><tr><th>Data</th><th>Tipo</th><th>Categoria</th><th>Descrizione</th><th style="text-align:right">Importo</th></tr></thead><tbody>${rows || '<tr><td colspan="5" style="text-align:center;">Nessuna transazione.</td></tr>'}</tbody></table>`;
    } else if (reportType === 'Anagrafe Risorse') {
        const rows = categories.map(c => `<tr><td style="font-weight:bold;">${c.name}</td><td>${c.subcategories.map(s => typeof s === 'string' ? s : s.name).join(', ')}</td></tr>`).join('');
        bodyHtml = `<h1>📋 Anagrafe Risorse — ${userName}</h1><table><thead><tr><th>Categoria</th><th>Sottocategorie</th></tr></thead><tbody>${rows}</tbody></table>`;
    } else if (reportType === 'Anagrafe Clienti') {
        const rows = clients.map(c => `<tr><td>${c.name}</td><td>${c.email||'-'}</td><td>${c.city||'-'}</td></tr>`).join('');
        bodyHtml = `<h1>👥 Anagrafe Clienti — ${userName}</h1><table><thead><tr><th>Nome</th><th>Email</th><th>Città</th></tr></thead><tbody>${rows || '<tr><td colspan="3" style="text-align:center;">Nessun cliente.</td></tr>'}</tbody></table>`;
    }

    const w = window.open('', '_blank', 'width=900,height=700');
    w.document.write(`<!DOCTYPE html><html><head><title>${reportType} — Prima Nota Pro</title>
    <style>body{font-family:'Segoe UI',Tahoma,sans-serif;padding:40px;color:#2d3326;}
    h1{font-size:1.5rem;border-bottom:2px solid #5d664c;padding-bottom:10px;margin-bottom:20px;color:#3e4433;}
    table{width:100%;border-collapse:collapse;font-size:0.85rem;margin-top:1.5rem;}
    th{text-align:left;padding:10px;background:#f2efea;border-bottom:2px solid #ddd;font-size:0.7rem;text-transform:uppercase;color:#5d664c;letter-spacing:0.05em;}
    td{padding:10px;border-bottom:1px solid #eee;}
    .footer{margin-top:30px;text-align:center;font-size:0.7rem;color:#999;}
    @media print{body{padding:20px;}}</style></head><body>${bodyHtml}
    <div class="footer">© 2026 Prima Nota Pro 1.0® — AppStudio Ecosystem</div></body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 400);
};
