// Prima Nota Pro 1.0® - Onboarding Module

let selectedProfile = localStorage.getItem('pn_selected_profile');
let userCompany = localStorage.getItem('pn_company_name');
let userEmail = localStorage.getItem('pn_user_email');

function startOnboarding() {
    if (splashScreen) splashScreen.style.display = 'none';
    if (mainShell) {
        mainShell.style.display = 'grid';
        updateNavIcons();
        showSection('onboarding');
    }
}

function selectProfile(profile) {
    selectedProfile = profile;
    localStorage.setItem('pn_selected_profile', profile);
    const selection = document.getElementById('profile-selection');
    const form = document.getElementById('profile-form');
    
    selection.classList.add('fade-out');
    setTimeout(() => {
        selection.style.display = 'none';
        form.style.display = 'flex';
        form.classList.add('fade-in');
        
        if (userCompany) document.getElementById('comp-name').value = userCompany;
        if (userEmail) document.getElementById('user-email').value = userEmail;
    }, 300);
}

function enterApp() {
    const name = document.getElementById('comp-name').value;
    const email = document.getElementById('user-email').value;
    
    if (name && email) {
        userCompany = name;
        userEmail = email;
        localStorage.setItem('pn_company_name', name);
        localStorage.setItem('pn_user_email', email);
        
        const form = document.getElementById('profile-form');
        form.classList.add('fade-out');
        setTimeout(() => {
            form.style.display = 'none';
            document.querySelector('.sidebar').style.display = 'flex';
            mainContent.style.display = 'block';
            mainContent.classList.add('fade-in');
            renderDashboard();
        }, 300);
    } else {
        alert('Inserisci tutti i dati per continuare.');
    }
}

function renderOnboarding() {
    mainContent.innerHTML = `
        <div class="glass-card onboarding-card fade-in">
            ${getCardHeader('PIANETA REGISTRAZIONE', 'window.closeApp()')}
            <div class="card-body" style="padding: 4rem 2rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: 800;">Scegli il tuo Percorso</h2>
                <p style="margin-bottom: 3.5rem; color: #94a3b8; font-size: 1.1rem;">Personalizza l'app in base al tuo profilo lavorativo.</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;" id="profile-selection">
                    <div class="glass-card selection-card" style="padding: 2rem; cursor: pointer;" onclick="window.renderRegForm('Azienda')">
                        <div style="width: 50px; height: 50px; margin: 0 auto 1.5rem; color: var(--pn-indigo);">${icons.studio}</div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700;">Azienda</h3>
                        <p style="font-size: 0.9rem; color: #64748b; line-height: 1.6;">Gestione avanzata di fatturazione, clienti e prima nota.</p>
                    </div>
                    <div class="glass-card selection-card" style="padding: 2rem; cursor: pointer;" onclick="window.renderRegForm('Privato')">
                        <div style="width: 50px; height: 50px; margin: 0 auto 1.5rem; color: var(--pn-green);">${icons.dashboard}</div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700;">Privato</h3>
                        <p style="font-size: 0.9rem; color: #64748b; line-height: 1.6;">Soluzione semplice per la finanza personale e freelance.</p>
                    </div>
                </div>

                <div style="margin-top: 3rem; border-top: 1px solid var(--glass-border); padding-top: 3rem;">
                    <p style="color: #64748b; margin-bottom: 1.5rem; font-size: 0.9rem;">Hai già un account su un altro dispositivo?</p>
                    <button class="btn-primary" style="background: var(--eco-accent-dark); padding: 1rem 2rem;" onclick="window.showCloudRecovery()">RECUPERA DAL CLOUD ☁️</button>
                </div>


                <div id="profile-form" style="display: none; flex-direction: column; gap: 1.5rem; max-width: 400px; margin: 0 auto; text-align: left;">
                    <div>
                        <label class="input-label">Nome Realtà / Azienda</label>
                        <input type="text" id="comp-name" class="pn-input" placeholder="Es. Falco HQ">
                    </div>
                    <div>
                        <label class="input-label">Email Professionale</label>
                        <input type="email" id="user-email" class="pn-input" placeholder="nome@esempio.it">
                    </div>
                    <button class="btn-indigo" onclick="window.enterApp()" style="margin-top: 1rem;">ENTRA NELL'UFFICIO</button>
                    <button class="btn-indigo" style="background: rgba(255,255,255,0.05); color: #64748b;" onclick="location.reload()">INDIETRO</button>
                </div>
            </div>
        </div>
    `;
}

function renderRegForm(type) {
    const selection = document.getElementById('profile-selection');
    const form = document.getElementById('profile-form');
    
    selection.classList.add('fade-out');
    setTimeout(() => {
        selection.style.display = 'none';
        form.style.display = 'flex';
        form.classList.add('fade-in');
        form.innerHTML = `
            <h3 style="margin-bottom: 1.5rem; color: ${type === 'Azienda' ? 'var(--pn-indigo)' : 'var(--pn-green)'};">Configurazione Profilo ${type}</h3>
            <div>
                <label class="input-label">Inserisci il tuo Nome / Ragione Sociale</label>
                <input type="text" id="user-name" class="pn-input" placeholder="Es. Mario Rossi">
            </div>
            <button class="btn-indigo" style="background: ${type === 'Azienda' ? 'var(--pn-indigo)' : 'var(--pn-green)'}; color: white;" onclick="window.completeOnboarding('${type}')">COMPLETA SETUP</button>
            <button class="btn-indigo" style="background: rgba(255,255,255,0.05); color: #64748b;" onclick="window.renderOnboarding()">INDIETRO</button>
        `;
    }, 300);
}

function completeOnboarding(type) {
    const name = document.getElementById('user-name').value;
    if (!name) return alert('Inserisci un nome per continuare.');
    localStorage.setItem('pn_user_type', type);
    localStorage.setItem('pn_user_name', name);
    window.showSection('dashboard');
}

window.showCloudRecovery = () => {
    const name = prompt("Inserisci il Nome del tuo Ristorante/Attività salvato nel Cloud:");
    if (name) {
        window.executeCloudRecovery(name);
    }
};

window.executeCloudRecovery = async (name) => {
    const success = await fetchDataFromCloud(name);
    if (success) {
        alert("Dati recuperati con successo! Accesso in corso...");
        location.reload(); // Refresh to apply all modular data
    }
};

