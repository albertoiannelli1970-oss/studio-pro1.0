const content = document.getElementById('app-container');

// Auto-login check for Hub
window.addEventListener('DOMContentLoaded', () => {
  const userName = localStorage.getItem('pn_user_name');
  if (userName) {
    showOffice();
  }
});

function showAuth() {
  content.innerHTML = `
    <div class="glass-card fade-in" style="padding: 3rem; width: 100%; max-width: 600px; margin: 2rem auto;">
      <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-yellow);">Unisciti a Noi</h2>
      <p style="color: var(--text-secondary); margin-bottom: 2rem;">Scegli il tuo profilo e inizia a creare.</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div class="glass-card" style="padding: 1.5rem; cursor: pointer; border: 2px solid var(--color-orange);" onclick="showRegForm('Privato')">
          <h3 style="color: var(--color-orange);">Privato</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">Ideale per singoli creatori.</p>
        </div>
        <div class="glass-card" style="padding: 1.5rem; cursor: pointer; border: 2px solid var(--color-red);" onclick="showRegForm('Azienda')">
          <h3 style="color: var(--color-red);">Azienda</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">Per team e grandi progetti.</p>
        </div>
      </div>
      
      <div id="reg-form-container"></div>
      
      <p style="margin-top: 2rem; color: var(--text-secondary);">Hai già un account? <a href="#" onclick="showLogin()" style="color: var(--color-celeste); text-decoration: none;">Accedi qui</a></p>
    </div>
  `;
}

function showRegForm(type) {
  const container = document.getElementById('reg-form-container');
  const accent = type === 'Azienda' ? 'var(--color-red)' : 'var(--color-orange)';
  container.innerHTML = `
    <div class="fade-in" style="text-align: left;">
      <hr style="border: 0.5px solid var(--glass-border); margin: 1.5rem 0;">
      <h3 style="margin-bottom: 1rem; color: ${accent};">Registrazione ${type}</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" id="reg-name" placeholder="Nome Completo" style="padding: 1rem; border-radius: 12px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white; outline: none;">
        <input type="email" id="reg-email" placeholder="Email" style="padding: 1rem; border-radius: 12px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white; outline: none;">
        <button class="btn-primary" style="margin-top: 1rem; background: ${accent}; color: white;" onclick="handleRegistration('${type}')">Crea Account ${type}</button>
      </div>
    </div>
  `;
}

function handleRegistration(type) {
  const name = document.getElementById('reg-name').value;
  if (!name) return alert('Inserisci un nome.');
  localStorage.setItem('pn_user_name', name);
  localStorage.setItem('pn_user_type', type);
  showOffice();
}

function showLogin() {
  content.innerHTML = `
    <div class="glass-card fade-in" style="padding: 3rem; width: 100%; max-width: 450px; margin: 2rem auto;">
      <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--color-celeste);">Bentornato</h2>
      <div style="display: flex; flex-direction: column; gap: 1.2rem; text-align: left;">
        <input type="email" placeholder="Email" style="padding: 1.2rem; border-radius: 14px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white;">
        <input type="password" placeholder="Password" style="padding: 1.2rem; border-radius: 14px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white;">
        <button class="btn-primary" style="margin-top: 1rem; background: var(--color-celeste); color: #000;" onclick="showOffice()">Entra nell'Ufficio</button>
      </div>
      <p style="margin-top: 2rem; color: var(--text-secondary);">Nuovo qui? <a href="#" onclick="showAuth()" style="color: var(--color-yellow); text-decoration: none;">Crea Account</a></p>
    </div>
  `;
}

function showOffice() {
  content.className = "container fade-in"; // Use container instead of hero
  content.style.paddingTop = "40px";
  content.style.display = "block";
  content.style.textAlign = "left";
  content.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;">
        <div>
          <h1 style="font-size: 3.5rem; margin-bottom: 0.5rem; background: var(--gradient-fun); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Falco Creator Hub</h1>
          <p style="color: var(--text-secondary); font-size: 1.2rem;">Centro di comando e sviluppo.</p>
        </div>
        <div class="glass-card" style="padding: 0.8rem 1.5rem; border-color: var(--color-yellow);">
          <span style="color: var(--color-yellow); font-weight: 800;">STATUS: ONLINE</span>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="glass-card" style="padding: 2.5rem; border-top: 4px solid var(--color-yellow);">
            <h2 style="margin-bottom: 1.5rem;">📁 Le Mie App</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="glass-card" style="padding: 1.5rem; background: rgba(255, 223, 0, 0.05); border: 1px solid var(--pn-yellow); text-align: center; cursor: pointer;" onclick="window.location.href='prima-nota/index.html'">
                <p style="font-size: 2rem; margin-bottom: 0.5rem;">📈</p>
                <h3>Prima Nota Pro</h3>
                <p style="font-size: 0.7rem; color: var(--text-secondary);">v1.0.0 Stable</p>
              </div>
              <div class="glass-card" style="padding: 1.5rem; background: rgba(255, 223, 0, 0.05); border: 2px dashed var(--color-yellow); text-align: center; cursor: pointer;">
                <p style="font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--color-yellow);">+</p>
                <h3>Nuova App</h3>
              </div>
            </div>
          </div>
          
          <div class="glass-card" style="padding: 2.5rem; border-top: 4px solid var(--color-celeste);">
            <h2 style="margin-bottom: 1.5rem;">💬 Feedback Utenti</h2>
            <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 15px; border-left: 6px solid var(--color-celeste);">
              <p style="margin-bottom: 1rem; font-style: italic;">"Ottimo lavoro sul nuovo design!"</p>
              <button class="btn-secondary" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Rispondi ora</button>
            </div>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="glass-card" style="padding: 2rem; border-top: 4px solid var(--color-orange);">
            <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">🔔 Notifiche</h2>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="padding: 0.8rem; background: rgba(255,145,0,0.1); border-radius: 10px; font-size: 0.9rem;">
                Aggiornamento v1.0.1 disponibile
              </div>
              <div style="padding: 0.8rem; background: rgba(255,145,0,0.1); border-radius: 10px; font-size: 0.9rem;">
                Nuovo backup completato
              </div>
            </div>
          </div>
          
          <div class="glass-card" style="padding: 2rem; background: var(--gradient-fun); color: #000;">
            <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">🔥 Trend</h2>
            <p><strong>App più usata:</strong> Magazzino X</p>
            <p><strong>Utenti attivi:</strong> 1,240</p>
          </div>
        </div>
      </div>
      
      <button class="btn-secondary" style="margin-top: 3rem; border-color: var(--color-red); color: var(--color-red);" onclick="location.reload()">Scollegati</button>
    </div>
  `;
}
