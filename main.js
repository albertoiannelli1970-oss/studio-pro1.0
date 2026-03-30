// Falco 1970 - AppStudio Pro 1.0® Hub Controller
// Lightweight portal management

window.addEventListener('DOMContentLoaded', () => {
    // If user is already "registered", we can skip the landing and show the ecosystem directly
    const userName = localStorage.getItem('pn_user_name');
    if (userName) {
        // Auto-show ecosystem if name is present
        setTimeout(() => {
            if (window.startHub) window.startHub();
        }, 500);
    }
});

// The Hub's main "Comincia Ora" logic is now mostly inline in index.html for performance,
// but we keep this here for extended logic if needed.
window.startHub = () => {
    const sections = ['why', 'apps', 'status-section', 'features-section', 'hub-nav', 'hub-login-btn'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'hub-nav') {
                el.style.display = 'flex';
                el.classList.add('fade-in');
            } else {
                el.style.display = 'block';
                el.classList.add('fade-in');
            }
        }
    });

    const startBtn = document.getElementById('main-start-btn');
    if (startBtn) startBtn.style.display = 'none';

    // Smooth scroll to apps
    const appsSection = document.getElementById('apps');
    if (appsSection) {
        appsSection.scrollIntoView({ behavior: 'smooth' });
    }
};

// Global Reset for the ecosystem
window.resetEcosystem = () => {
    if (confirm("Sei sicuro? Questo cancellerà tutti i dati locali (Prima Nota, Magazzino, CRM) su questo dispositivo.")) {
        localStorage.clear();
        // Redirect to same page but with cache buster
        const url = new URL(window.location.href);
        url.searchParams.set('v', Date.now());
        window.location.href = url.toString();
    }
};

// Safe Supabase Checker (prevent Crashes in modules)
window.isCloudActive = () => {
    return !!(localStorage.getItem('SUPABASE_URL') && localStorage.getItem('SUPABASE_KEY'));
};
