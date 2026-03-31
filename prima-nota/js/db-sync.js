// Prima Nota Pro 1.0® - Cloud Sync Module (Supabase)
// Sincronizzazione Cloud Silenziosa

// Placeholder for user credentials
const SUPABASE_URL = 'https://suqjbsmtxvmhgxvhhhbs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5TgjclCF6MjUY3z9pfQLvw_233FAMdo';

let supabaseClient = null;

function initSupabase(url, key) {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(url || SUPABASE_URL, key || SUPABASE_KEY);
    } else {
        console.warn("Libreria Supabase non caricata.");
    }
}


async function syncToCloud() {
    if (!supabaseClient) initSupabase();
    if (!supabaseClient) return;

    window.showToast("Sincronizzazione in corso...", "info", 2000);
    
    try {
        const username = localStorage.getItem('pn_user_name');
        const data = {
            user_name: username,
            company_name: localStorage.getItem('pn_company_name'),
            categories: localStorage.getItem('pn_categories'),
            transactions: localStorage.getItem('pn_transactions'),
            suppliers: localStorage.getItem('pn_suppliers'),
            orders: localStorage.getItem('pn_orders'),
            inventory: localStorage.getItem('pn_inventory'),
            clients: localStorage.getItem('pn_clients'),
            last_sync: new Date().toISOString()
        };

        const { error } = await supabaseClient
            .from('prima_nota_backups')
            .upsert(data, { onConflict: 'user_name' });

        if (error) throw error;
        window.showToast("Sincronizzazione completata ✨", "success");
    } catch (err) {
        console.error('Cloud Sync Error:', err);
        window.showToast("Errore di sincronizzazione cloud", "error");
    }
}

async function fetchDataFromCloud(username) {
    if (!username) return;
    if (!supabaseClient) initSupabase();

    try {
        const { data, error } = await supabaseClient
            .from('prima_nota_backups')
            .select('*')
            .eq('user_name', username)
            .single();

        if (error) {
            if (error.code === 'PGRST116') throw new Error("Utente non trovato nel cloud.");
            throw error;
        }

        if (data) {
            if (data.categories) localStorage.setItem('pn_categories', data.categories);
            if (data.transactions) localStorage.setItem('pn_transactions', data.transactions);
            if (data.suppliers) localStorage.setItem('pn_suppliers', data.suppliers);
            if (data.orders) localStorage.setItem('pn_orders', data.orders);
            if (data.inventory) localStorage.setItem('pn_inventory', data.inventory);
            if (data.clients) localStorage.setItem('pn_clients', data.clients);
            
            window.showToast("Dati recuperati dal Cloud", "success");
            window.location.reload(); // Ricarica per applicare i dati
            return true;
        }
    } catch (err) {
        console.error("Cloud Fetch Error:", err);
        window.showToast("Errore durante il recupero: " + err.message, "error");
        return false;
    }
}
