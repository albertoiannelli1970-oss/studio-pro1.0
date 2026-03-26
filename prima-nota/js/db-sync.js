// Prima Nota Pro 1.0® - Cloud Sync Module (Supabase)
alert("Sincronizzazione Cloud Caricata!");

// Placeholder for user credentials
const SUPABASE_URL = 'https://suqjbsmtxvmhgxvhhhbs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5TgjclCF6MjUY3z9pfQLvw_233FAMdo';

let supabaseClient = null;

function initSupabase(url, key) {
    alert("DEBUG: initSupabase partita. Controllo libreria...");
    if (window.supabase) {
        alert("DEBUG: window.supabase trovato!");
        supabaseClient = window.supabase.createClient(url || SUPABASE_URL, key || SUPABASE_KEY);
        if (supabaseClient) alert("DEBUG: Client creato con successo!");
        else alert("DEBUG: Errore nella creazione del client.");
    } else {
        alert("Attenzione: Libreria Supabase non caricata. Tipo: " + typeof window.supabase);
    }
}

async function syncToCloud() {
    console.log("Sync attempt...");
    if (!supabaseClient) {
        alert("Errore: Il sistema Cloud non è stato inizializzato. Controlla la connessione internet.");
        return;
    }

    alert("Avvio sincronizzazione cloud...");

    const data = {
        user_name: localStorage.getItem('pn_user_name'),
        company_name: localStorage.getItem('pn_company_name'),
        categories: localStorage.getItem('pn_categories'),
        transactions: localStorage.getItem('pn_transactions'),
        clients: localStorage.getItem('pn_clients'),
        last_sync: new Date().toISOString()
    };

    try {
        const { data: result, error } = await supabaseClient
            .from('prima_nota_backups')
            .upsert(data, { onConflict: 'user_name' });

        if (error) throw error;
        alert("Sincronizzazione completata con successo!");
    } catch (err) {
        console.error("Sync error:", err);
        alert("Errore durante la sincronizzazione: " + err.message);
    }
}
