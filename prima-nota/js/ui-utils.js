// Prima Nota Pro 1.0® - UI Utilities & Icons

const mainContent = document.getElementById('main-content');
const splashScreen = document.getElementById('splash-screen');
const mainShell = document.getElementById('main-shell');

const icons = {
    dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
    categorie: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    sottocategorie: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
    clienti: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    scadenzario: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>`,
    studio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>`,
    stampa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`
};

function updateNavIcons() {
    if (document.getElementById('nav-dashboard')) document.getElementById('nav-dashboard').innerHTML = `<span class="nav-icon">📊</span><span class="nav-text">Dashboard Bilancio</span>`;
    if (document.getElementById('nav-categorie')) document.getElementById('nav-categorie').innerHTML = `<span class="nav-icon">📚</span><span class="nav-text">Legenda Categorie</span>`;
    if (document.getElementById('nav-sottocategorie')) document.getElementById('nav-sottocategorie').innerHTML = `<span class="nav-icon">📋</span><span class="nav-text">Anagrafe Risorse</span>`;
    if (document.getElementById('nav-clienti')) document.getElementById('nav-clienti').innerHTML = `<span class="nav-icon">👥</span><span class="nav-text">Anagrafe Clienti</span>`;
    if (document.getElementById('nav-scadenzario')) document.getElementById('nav-scadenzario').innerHTML = `<span class="nav-icon">📅</span><span class="nav-text">Scadenzario</span>`;
    if (document.getElementById('nav-studio')) document.getElementById('nav-studio').innerHTML = `<span class="nav-icon">📈</span><span class="nav-text">Modulo Studio Analyst</span>`;
    if (document.getElementById('nav-stampa')) document.getElementById('nav-stampa').innerHTML = `<span class="nav-icon">🖨️</span><span class="nav-text">Centro Stampa</span>`;
}

function getCardHeader(title = "", onClose = "renderDashboard()") {
    return `<div class="card-header" style="padding:1.2rem 1.8rem; background:rgba(93,102,76,0.03); border-bottom:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.8rem; font-weight:900; color:var(--eco-accent); text-transform:uppercase; letter-spacing:0.12em; opacity:0.8;">${title}</span>
        <div class="window-controls">
            <div class="win-dot red" title="Chiudi" onclick="${onClose}"></div>
            <div class="win-dot yellow" title="Iconizza" onclick="window.toggleMinimize(this)"></div>
            <div class="win-dot green" title="Ingrandisci" onclick="window.toggleMaximize(this)"></div>
        </div>
    </div>`;
}

function renderPageHero(title, sub, icon) {
    return `<div class="fade-in" style="margin-bottom:2.5rem; width:100%; max-width:1200px;">
        <div style="display:flex; align-items:center; gap:1.2rem; margin-bottom:0.8rem;">
            <div style="width:10px; height:10px; border-radius:50%; background:var(--eco-secondary); box-shadow:0 0 15px rgba(140,108,76,0.3);"></div>
            <span style="font-size:0.85rem; font-weight:800; color:var(--eco-secondary); text-transform:uppercase; letter-spacing:0.1em;">${icon}</span>
        </div>
        <h1 style="font-weight:900; font-size:2.8rem; margin:0; letter-spacing:-0.04em; color:var(--eco-text-title);">${title}</h1>
        <p style="color:var(--eco-text-body); font-size:1.1rem; margin-top:0.4rem; opacity:0.8;">${sub}</p>
    </div>`;
}

