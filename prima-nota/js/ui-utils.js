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
    document.getElementById('nav-dashboard').innerHTML = `${icons.dashboard} Dashboard`;
    document.getElementById('nav-categorie').innerHTML = `${icons.categorie} Categorie`;
    document.getElementById('nav-sottocategorie').innerHTML = `${icons.sottocategorie} Sottocategorie`;
    document.getElementById('nav-clienti').innerHTML = `${icons.clienti} Clienti`;
    document.getElementById('nav-scadenzario').innerHTML = `${icons.scadenzario} Scadenzario`;
    document.getElementById('nav-studio').innerHTML = `${icons.studio} Modulo Studio`;
    document.getElementById('nav-stampa').innerHTML = `${icons.stampa} Stampa`;
}

function getCardHeader(title = "", onClose = "window.closeCard(this)", onMinimize = "window.toggleMinimize(this)", onMaximize = "window.toggleMaximize(this)") {
    return `
        <div class="card-header">
            <div class="window-controls">
                <span class="control close" title="Esci" onclick="${onClose}"></span>
                <span class="control minimize" title="Iconizza" onclick="${onMinimize}"></span>
                <span class="control maximize" title="Ingrandisci" onclick="${onMaximize}"></span>
            </div>
            ${title ? `<span class="header-title">${title}</span>` : ''}
        </div>
    `;
}

function renderPageHero(title, subtitle, iconKey) {
    const iconSvg = icons[iconKey] || '';
    return `
        <div class="page-hero fade-in" style="margin-bottom: 2rem; width: 100%; max-width: 1200px;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                <div style="width: 40px; height: 40px; color: var(--pn-indigo);">
                    ${iconSvg}
                </div>
                <h1 style="font-size: 2.2rem; margin: 0; font-weight: 800; color: white;">${title}</h1>
            </div>
            <p style="color: #64748b; font-size: 1rem; margin-left: 3.2rem;">${subtitle}</p>
        </div>
    `;
}
