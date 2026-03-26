// Prima Nota Pro 1.0® - CRM Module

function renderClienti() {
    const container = mainContent;
    const clients = clientManager.getClients();

    container.innerHTML = `
        <div class="glass-card module-card fade-in" id="window-clienti">
            ${getCardHeader('ANAGRAFE CLIENTI', 'window.renderDashboard()', 'window.toggleWindow(\'window-clienti\')', 'window.maximizeWindow(\'window-clienti\')')}
            <div class="card-body window-body" style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <input type="text" id="client-search" class="pn-input" placeholder="Cerca cliente per nome o email..." oninput="window.filterClients(this.value)" style="width: 100%; max-width: 500px;">
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-indigo" onclick="window.generatePDF('Anagrafe Clienti CRM')">🖨️ STAMPA CRM</button>
                        <button class="btn-indigo" onclick="window.showClientForm()">+ NUOVO CLIENTE</button>
                    </div>
                </div>
                <div id="clients-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                    ${renderClientList(clients)}
                </div>
            </div>
        </div>
    `;
}

function renderClientList(clients) {
    if (clients.length === 0) return `<div class="glass-card" style="grid-column: 1/-1; padding: 3rem; text-align: center; color: #64748b;">Nessun cliente trovato.</div>`;
    return clients.map(c => `
        <div class="glass-card fade-in" style="padding: 1.5rem; border-left: 4px solid var(--pn-indigo);">
            <h3 style="margin-bottom: 0.5rem;">${c.name}</h3>
            <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">${c.email}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem; margin-top: 1rem;">
                <span style="font-size: 0.75rem; color: #64748b;">📍 ${c.city}</span>
                <button class="btn-icon-small">✏️</button>
            </div>
        </div>
    `).join('');
}

function filterClients(query) {
    const container = document.getElementById('clients-container');
    const filtered = clientManager.getClients().filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.email.toLowerCase().includes(query.toLowerCase())
    );
    container.innerHTML = renderClientList(filtered);
}

function showClientForm() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="glass-card onboarding-card" style="max-width: 450px; padding: 2.5rem;">
            <div class="card-header">
                <div class="window-controls"><span class="control close" onclick="this.closest('.modal-overlay').remove()"></span></div>
                <span class="header-title">NUOVO CLIENTE CRM</span>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                <label class="input-label">Ragione Sociale / Nome</label>
                <input type="text" id="new-client-name" class="pn-input" placeholder="Rossi S.r.l.">
                
                <label class="input-label" style="margin-top: 1rem;">Email Ufficiale</label>
                <input type="email" id="new-client-email" class="pn-input" placeholder="amministrazione@...">
                
                <label class="input-label" style="margin-top: 1rem;">Città / Sede</label>
                <input type="text" id="new-client-city" class="pn-input" placeholder="Milano, Roma...">

                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button class="btn-indigo" style="flex: 2;" onclick="window.confirmAddClient()">REGISTRA CLIENTE</button>
                    <button class="btn-indigo" style="flex: 1; background: rgba(255,255,255,0.1);" onclick="this.closest('.modal-overlay').remove()">ANNULLA</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function confirmAddClient() {
    const name = document.getElementById('new-client-name').value;
    const email = document.getElementById('new-client-email').value;
    const city = document.getElementById('new-client-city').value;
    
    if (name && email) {
        clientManager.addClient(name, email, city);
        document.querySelector('.modal-overlay').remove();
        renderClienti();
    } else {
        alert('Nome ed Email sono obbligatori.');
    }
}
