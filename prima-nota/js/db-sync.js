// Prima Nota Pro 1.0® - Cloud Sync Module (Supabase)
alert("Sincronizzazione Cloud Caricata!");

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
    console.log("Sync push attempt...");
    if (!supabaseClient) {
        initSupabase();
        if (!supabaseClient) return alert("Sistema Cloud non pronto.");
    }

    const data = {
        user_name: localStorage.getItem('pn_user_name'),
        company_name: localStorage.getItem('pn_company_name'),
        categories: localStorage.getItem('pn_cat_ristorante'),
        transactions: localStorage.getItem('pn_trx_ristorante'),
        clients: localStorage.getItem('pn_clients'),
        last_sync: new Date().toISOString()
    };

    try {
        const { data: result, error } = await supabaseClient
            .from('prima_nota_backups')
            .upsert(data, { onConflict: 'user_name' });

        if (error) throw error;
        alert("Sincronizzazione Cloud completata! ✅");
    } catch (err) {
        console.error("Sync push error:", err);
        alert("Errore sincronizzazione: " + err.message);
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
            if (data.company_name) localStorage.setItem('pn_company_name', data.company_name);
            if (data.categories) localStorage.setItem('pn_cat_ristorante', data.categories);
            if (data.transactions) localStorage.setItem('pn_trx_ristorante', data.transactions);
            if (data.clients) localStorage.setItem('pn_clients', data.clients);
            localStorage.setItem('pn_user_name', username);
            localStorage.setItem('pn_user_type', 'Azienda'); // Default
            return true;
        }
    } catch (err) {
        console.error("Cloud Fetch Error:", err);
        alert("Errore durante il recupero: " + err.message);
        return false;
    }
}

