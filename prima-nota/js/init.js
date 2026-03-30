// Prima Nota Pro 1.0® - Main Initialization & Routing

// --- AUTO-SYNC SETUP ---


if (typeof CategoryManager !== 'undefined') {
    CategoryManager.onDataChange = (type) => {
        console.log(`Data changed: ${type}. Auto-syncing...`);
        // syncToCloud(); // Uncomment after setting credentials
    };
}

// --- GLOBAL ATTACHMENTS ---
window.renderDashboard = window.renderDashboard || renderDashboard;
window.renderClienti = window.renderClienti || renderClienti;
window.filterClients = window.filterClients || filterClients;
window.showClientForm = window.showClientForm || showClientForm;
window.confirmAddClient = window.confirmAddClient || confirmAddClient;
window.renderCategories = window.renderCategories || renderCategories;
window.showCatForm = window.showCatForm || showCatForm;
window.confirmAddCat = window.confirmAddCat || confirmAddCat;
window.editCat = window.editCat || editCat;
window.confirmEditCat = window.confirmEditCat || confirmEditCat;
window.deleteCat = window.deleteCat || deleteCat;
window.showSubForm = window.showSubForm || showSubForm;
window.confirmAddSub = window.confirmAddSub || confirmAddSub;
window.editSub = window.editSub || editSub;
window.confirmEditSub = window.confirmEditSub || confirmEditSub;
window.deleteSub = window.deleteSub || deleteSub;
window.renderSubcategories = window.renderSubcategories || renderSubcategories;
window.showGlobalSubForm = window.showGlobalSubForm || showGlobalSubForm;
window.confirmAddGlobalSub = window.confirmAddGlobalSub || confirmAddGlobalSub;
window.showTransactionForm = window.showTransactionForm || showTransactionForm;
window.confirmAddTransaction = window.confirmAddTransaction || confirmAddTransaction;
window.handleSubcategorySearch = window.handleSubcategorySearch || handleSubcategorySearch;
window.handleSubcategoryChange = window.handleSubcategoryChange || handleSubcategoryChange;
window.renderStudio = window.renderStudio || renderStudio;
window.renderStampa = window.renderStampa || renderStampa;
window.renderPrivacySection = window.renderPrivacy || renderPrivacy; 
window.renderContatti = window.renderContatti || renderContatti;
window.startOnboarding = window.startOnboarding || startOnboarding;
window.renderOnboarding = window.renderOnboarding || renderOnboarding;
window.selectProfile = window.selectProfile || selectProfile;

window.enterApp = window.enterApp || enterApp;
window.renderRegForm = window.renderRegForm || renderRegForm;
window.completeOnboarding = window.completeOnboarding || completeOnboarding;
window.generatePDF = window.generatePDF || generatePDF;
window.syncToCloud = window.syncToCloud || syncToCloud;
window.fetchDataFromCloud = window.fetchDataFromCloud || fetchDataFromCloud;
window.initSupabase = window.initSupabase || initSupabase;
window.logout = window.logout || logout;
window.showSection = window.showSection || showSection;

window.toggleMinimize = (el) => {

    const card = el.closest('.glass-card') || el.closest('.form-card');
    if(card) card.classList.toggle('minimized');
};
window.toggleMaximize = (el) => {
    const card = el.closest('.glass-card') || el.closest('.form-card');
    if(card) card.classList.toggle('maximized');
};
window.closeCard = (el) => {
    const overlay = el.closest('.modal-overlay');
    if(overlay) overlay.remove();
};

// --- ROUTING & NAV ---
function showSection(name) {
    mainContent.className = 'fade-in';
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === `nav-${name}`) btn.classList.add('active');
    });

    // Auto-collapse sidebar on mobile after selection
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.add('collapsed');
    }

    switch(name) {
        case 'onboarding': renderOnboarding(); break;
        case 'dashboard': renderDashboard(); break;
        case 'inventory': renderInventory(); break;
        case 'catconfig': renderCatConfig(); break;
        case 'suppliers': renderSuppliers(); break;
        case 'categorie': renderCategories(); break;
        case 'sottocategorie': renderSubcategories(); break;
        case 'clienti': renderClienti(); break;
        case 'scadenzario': // reusing renderSubcategories or adding specific if needed
                           renderSubcategories(); break; 
        case 'studio': renderStudio(); break;
        case 'stampa': renderStampa(); break;
        case 'privacy': renderPrivacy(); break;
        case 'contatti': renderContatti(); break;
        default: renderDashboard();
    }
}

// --- WINDOW CONTROLS ---
function toggleWindow(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const body = el.querySelector('.window-body');
    if (body) {
        body.style.display = body.style.display === 'none' ? 'block' : 'none';
        el.style.height = body.style.display === 'none' ? '60px' : 'auto';
    }
}

function maximizeWindow(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('maximized');
}

function minimizeCard() {
    mainContent.style.opacity = mainContent.style.opacity === '0.2' ? '1' : '0.2';
    mainContent.style.transform = mainContent.style.opacity === '0.2' ? 'scale(0.95)' : 'scale(1)';
}

function closeCard() {
    renderDashboard();
}

function closeApp() {
    mainShell.classList.add('fade-out');
    setTimeout(() => {
        mainShell.style.display = 'none';
        splashScreen.style.display = 'flex';
        splashScreen.classList.remove('fade-out');
    }, 300);
}

// --- AUTO-LOGIN CHECK ---
window.addEventListener('DOMContentLoaded', () => {
    const userType = localStorage.getItem('pn_user_type');
    const userName = localStorage.getItem('pn_user_name');

    if (userType && userName) {
        if (splashScreen) splashScreen.style.display = 'none';
        if (mainShell) {
            mainShell.style.display = 'grid';
            updateNavIcons();

            // Initial mobile check
            if (window.innerWidth <= 1024) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.add('collapsed');
            }

            initSupabase(); 
            renderDashboard();
        }
    }
});


