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
        <div class="glass-card fade-in" style="padding: 1.5rem; border-left: 4px solid var(--pn-indigo); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
                <h3 style="margin-bottom: 0.5rem; font-size:1.1rem;">${c.name}</h3>
                <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">${c.email}</p>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1rem; margin-top: 1rem;">
                <span style="font-size: 0.75rem; color: #64748b;">📍 ${c.city}</span>
                <div style="display:flex; gap:0.5rem;">
                    <button class="win-dot yellow" onclick="window.editClient(${c.id})"></button>
                    <button class="win-dot red" onclick="window.deleteClient(${c.id})"></button>
                </div>
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

window.confirmAddClient = () => {
    const nameVal = window.Validator.validateField('new-client-name', 'text');
    const emailVal = window.Validator.validateField('new-client-email', 'text');
    
    if (!nameVal || !emailVal) {
        window.showToast("Nome ed Email sono obbligatori", "error");
        return;
    }

    const name = document.getElementById('new-client-name').value;
    const email = document.getElementById('new-client-email').value;
    const city = document.getElementById('new-client-city').value;
    
    clientManager.addClient(name, email, city);
    window.showToast("Cliente registrato", "success");
    document.querySelector('.modal-overlay').remove();
    renderClienti();
};

window.editClient = (id) => {
    const client = clientManager.getClients().find(c => c.id === id);
    if (!client) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 450px;">
            ${getCardHeader('MODIFICA CLIENTE', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem;">
                <label class="input-label">Ragione Sociale</label>
                <input type="text" id="edit-client-name" class="pn-input" value="${client.name}">
                <label class="input-label" style="margin-top: 1rem;">Email</label>
                <input type="email" id="edit-client-email" class="pn-input" value="${client.email}">
                <label class="input-label" style="margin-top: 1rem;">Città</label>
                <input type="text" id="edit-client-city" class="pn-input" value="${client.city}">
                <button class="btn-primary" style="width: 100%; margin-top: 2rem;" onclick="window.confirmEditClient(${id})">SALVA MODIFICHE</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.confirmEditClient = (id) => {
    const nameVal = window.Validator.validateField('edit-client-name', 'text');
    if (!nameVal) return;

    const name = document.getElementById('edit-client-name').value;
    const email = document.getElementById('edit-client-email').value;
    const city = document.getElementById('edit-client-city').value;
    
    const client = clientManager.clients.find(c => c.id === id);
    if (client) {
        Object.assign(client, { name, email, city, updatedAt: new Date().toISOString() });
        clientManager.save();
        window.showToast("Cliente aggiornato", "success");
        document.querySelector('.modal-overlay').remove();
        renderClienti();
    }
};

window.deleteClient = (id) => {
    if (confirm("Eliminare definitivamente questo cliente?")) {
        clientManager.clients = clientManager.clients.filter(c => c.id !== id);
        clientManager.save();
        window.showToast("Cliente eliminato", "success");
        renderClienti();
    }
};

// Ensure globals
window.renderClienti = renderClienti;
window.filterClients = filterClients;
window.showClientForm = showClientForm;
window.confirmAddClient = confirmAddClient;
