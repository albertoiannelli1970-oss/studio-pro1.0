// Prima Nota Pro 1.0® - Info & Support Modules

function renderPrivacy() {
    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="margin-bottom: 2rem;">
            ${getCardHeader('PRIVACY & SICUREZZA', 'window.renderDashboard()')}
            <div style="padding: 2.5rem;">
                ${renderPageHero('Privacy & Sicurezza', 'Gestione dei dati personali e conformità alle normative GDPR.', 'studio')}
                <div class="glass-card" style="padding: 3rem; line-height: 1.8; color: #94a3b8; margin-top: 2rem;">
                    <h3 style="color: white; margin-bottom: 1.5rem;">Trattamento Dati Locali</h3>
                    <p>Prima Nota Pro 1.0® è progettata per la massima riservatezza. Tutti i tuoi dati finanziari sono memorizzati esclusivamente nel tuo browser via <strong>LocalStorage</strong>.</p>
                    <p>Nessun dato viene inviato a server esterni senza il tuo esplicito consenso. La crittografia locale garantisce che i tuoi segreti aziendali rimangano tuoi.</p>
                    <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 2rem 0;">
                    <button class="btn-indigo">SCARICA INFORMATIVA COMPLETA (PDF)</button>
                </div>
            </div>
        </div>
    `;
}

function renderContatti() {
    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="margin-bottom: 2rem;">
            ${getCardHeader('SUPPORTO & CONTATTI', 'window.renderDashboard()')}
            <div style="padding: 2.5rem;">
                ${renderPageHero('Supporto & Contatti', 'Siamo qui per aiutarti a far decollare il tuo business.', 'clienti')}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                    <div class="glass-card" style="padding: 2.5rem; border-top: 4px solid var(--pn-green);">
                        <h3 style="color: var(--pn-green); margin-bottom: 1.5rem;">Supporto Tecnico</h3>
                        <p style="color: #64748b; margin-bottom: 2rem;">Hai riscontrato un problema o hai un suggerimento? Il team di Falco HQ è a tua disposizione.</p>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span style="font-size: 1.5rem;">📧</span>
                                <span style="color: white;">supporto@webstudio-pro.it</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span style="font-size: 1.5rem;">🌐</span>
                                <a href="#" style="color: var(--pn-indigo); font-weight: 700;">Apri ticket di assistenza</a>
                            </div>
                        </div>
                    </div>
                    <div class="glass-card" style="padding: 2.5rem; border-top: 4px solid var(--pn-indigo);">
                        <h3 style="color: var(--pn-indigo); margin-bottom: 1.5rem;">Consulenza Strategica</h3>
                        <p style="color: #64748b; margin-bottom: 2rem;">Vuoi potenziare il tuo Modulo Studio®? Prenota una sessione con i nostri esperti.</p>
                        <button class="btn-indigo" style="width: 100%;">PRENOTA CALL ORA</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
