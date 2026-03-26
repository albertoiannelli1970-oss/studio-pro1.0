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

