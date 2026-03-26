// Prima Nota Pro 1.0® - Studio & Special Modules

function renderStudio() {
    const container = mainContent;
    container.innerHTML = `
        <div class="glass-card module-card fade-in" id="window-studio">
            ${getCardHeader('MODULO STUDIO PRO®', 'window.renderDashboard()', 'window.toggleWindow(\'window-studio\')', 'window.maximizeWindow(\'window-studio\')')}
            <div class="card-body window-body" style="padding: 4rem; text-align: center; border: 1px dashed rgba(255,255,255,0.1); margin: 2rem; border-radius: 20px;">
                <div style="position: absolute; top: 1rem; right: 1rem;">
                    <button class="btn-indigo" onclick="window.print()">🖨️ STAMPA SCHEDA</button>
                </div>
                <div style="font-size: 4rem; margin-bottom: 2rem; opacity: 0.3;">⚙️</div>
                <h3 style="color: #64748b; margin-bottom: 1rem;">Configurazione Intelligent Engine</h3>
                <p style="color: #475569; max-width: 500px; margin: 0 auto;">Questo modulo ti permetterà di collegare Prima Nota Pro ai tuoi sistemi esterni e personalizzare gli algoritmi di analisi predittiva.</p>
                <div style="margin-top: 3rem;">
                    <span class="badge-indigo" style="padding: 0.6rem 2rem; border-radius: 30px; font-weight: 700; font-size: 0.8rem;">IN FASE DI SVILUPPO</span>
                </div>
            </div>
        </div>
    `;
}
