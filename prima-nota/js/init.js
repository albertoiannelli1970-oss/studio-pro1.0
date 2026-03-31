// Prima Nota Pro 1.0® - Core Initialization & Routing
// Built for stability and performance

// --- STUCK-STATE RECOVERY (Failsafe) ---
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'auto';
    document.body.classList.remove('antigravity-scroll-lock');
    const shell = document.getElementById('app-shell');
    if (shell) {
        shell.style.filter = 'none';
        shell.style.backdropFilter = 'none';
    }
});

// --- GLOBAL ATTACHMENTS (Safe Module Checks) ---
window.renderDashboard = window.renderDashboard || (typeof renderDashboard !== 'undefined' ? renderDashboard : () => { console.error("renderDashboard missing"); });
window.renderInventory = window.renderInventory || (typeof renderInventory !== 'undefined' ? renderInventory : () => {});
window.renderCatConfig = window.renderCatConfig || (typeof renderCatConfig !== 'undefined' ? renderCatConfig : () => {});
window.renderSuppliers = window.renderSuppliers || (typeof renderSuppliers !== 'undefined' ? renderSuppliers : () => {});
window.renderClienti = window.renderClienti || (typeof renderClienti !== 'undefined' ? renderClienti : () => {});
window.renderPrivacySection = window.renderPrivacy || (typeof renderPrivacy !== 'undefined' ? renderPrivacy : () => {});
window.renderContatti = window.renderContatti || (typeof renderContatti !== 'undefined' ? renderContatti : () => {});
window.renderStudio = window.renderStudio || (typeof renderStudio !== 'undefined' ? renderStudio : () => {});
window.renderStampa = window.renderStampa || (typeof renderStampa !== 'undefined' ? renderStampa : () => {});

// --- ROUTING ENGINE ---
window.showSection = (name) => {
    const mainContent = document.getElementById('content-area');
    if (!mainContent) {
        console.error('content-area not found');
        return;
    }
    // Update global + scroll to top + ensure splash hidden
    window.mainContent = mainContent;
    mainContent.scrollTop = 0;
    const splash = document.getElementById('splash-screen');
    if (splash) splash.style.display = 'none';
    const shell = document.getElementById('app-shell');
    if (shell) shell.style.display = 'flex';

    mainContent.className = 'fade-in';
    
    // UI Updates
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === `nav-${name}`) btn.classList.add('active');
    });

    // Mobile Auto-collapse
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.add('collapsed');
    }

    // Render Logic
    switch(name) {
        case 'onboarding': if(window.renderOnboarding) window.renderOnboarding(); break;
        case 'dashboard': if(window.renderDashboard) window.renderDashboard(); break;
        case 'inventory': if(window.renderInventory) window.renderInventory(); break;
        case 'catconfig': if(window.renderCatConfig) window.renderCatConfig(); break;
        case 'suppliers': if(window.renderSuppliers) window.renderSuppliers(); break;
        case 'clienti': if(window.renderClienti) window.renderClienti(); break;
        case 'privacy': if(window.renderPrivacySection) window.renderPrivacySection(); break;
        case 'contatti': if(window.renderContatti) window.renderContatti(); break;
        case 'categorie': if(window.renderCategories) window.renderCategories(); break;
        case 'consolle': if(window.renderConsolle) window.renderConsolle(); else { mainContent.innerHTML = '<div class="glass-card fade-in" style="max-width:1200px; width:100%; padding:3rem;"><h2 style="color:var(--eco-text-title);">⚙️ Consolle API</h2><p style="color:var(--eco-text-body); margin-top:1rem;">Area sviluppatori per integrazioni e connessioni API esterne.</p><p style="color:var(--eco-accent); margin-top:2rem;">🔧 Modulo in fase di sviluppo avanzato.</p></div>'; } break;
        case 'studio': if(window.renderStudio) window.renderStudio(); break;
        case 'stampa': if(window.renderStampa) window.renderStampa(); break;
        case 'food-cost': if(window.renderFoodCost) window.renderFoodCost(); break;
        default: if(window.renderDashboard) window.renderDashboard();
    }
};

// --- WINDOW CONTROLS ---
window.toggleMinimize = (el) => {
    const card = el.closest('.glass-card') || el.closest('.form-card');
    if (!card) return;
    card.classList.remove('maximized');
    card.classList.toggle('minimized');
};

window.toggleMaximize = (el) => {
    const card = el.closest('.glass-card') || el.closest('.form-card');
    if (!card) return;
    card.classList.remove('minimized');
    const isMax = card.classList.toggle('maximized');
    // ESC key to exit fullscreen
    if (isMax) {
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                card.classList.remove('maximized');
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
};

window.closeCard = (el) => {
    const overlay = el.closest('.modal-overlay');
    if (overlay) { overlay.remove(); return; }
    const card = el.closest('.glass-card') || el.closest('.form-card');
    if (card) { card.classList.remove('minimized', 'maximized'); }
    window.showSection('dashboard');
};

window.logout = () => {
    if (confirm("Uscire dall'applicazione? I dati locali rimarranno salvati.")) {
        localStorage.removeItem('pn_selected_profile');
        location.reload();
    }
};

// --- CORE APP INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    const userType = localStorage.getItem('pn_user_type');
    const userName = localStorage.getItem('pn_user_name');

    // Reference common elements
    window.splashScreen = document.getElementById('splash-screen');
    window.mainShell = document.getElementById('app-shell');
    window.mainContent = document.getElementById('content-area');

    if (userType && userName) {
        // Fast-path to Dashboard
        if (window.splashScreen) window.splashScreen.style.display = 'none';
        if (window.mainShell) window.mainShell.style.display = 'flex';
        
        // Initialize Supabase if available
        if (window.initSupabase) window.initSupabase();
        
        const params = new URLSearchParams(window.location.search);
        const section = params.get('section');
        if (section) window.showSection(section);
        else window.showSection('dashboard');
    } else {
        // Start Onboarding
        if (window.startOnboarding) window.startOnboarding();
    }
});
