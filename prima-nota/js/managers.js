// Prima Nota Pro 1.0® - Data Management Managers

class CategoryManager {
    static onDataChange = null;
    constructor() {
        const stored = JSON.parse(localStorage.getItem('pn_cat_ristorante')) || JSON.parse(localStorage.getItem('pn_categories'));
        if (stored) {
            this.categories = this.migrate(stored);
        } else {
            this.categories = [
                { id: 1, name: 'Acquisti', subcategories: [{ name: 'Materie Prime', details: {} }, { name: 'Bevande', details: {} }, { name: 'Materiale Consumo', details: {} }, { name: 'Alimentari', details: {} }] },
                { id: 2, name: 'Personale', subcategories: [{ name: 'Stipendi', details: {} }, { name: 'Contributi', details: {} }, { name: 'TFR', details: {} }, { name: 'Assicurazioni', details: {} }] },
                { id: 3, name: 'Utenze', subcategories: [{ name: 'Luce', details: {} }, { name: 'Gas', details: {} }, { name: 'Acqua', details: {} }, { name: 'Rifiuti', details: {} }, { name: 'Internet', details: {} }] },
                { id: 4, name: 'Incassi', subcategories: [{ name: 'Settimanale', details: {} }, { name: 'Weekend', details: {} }, { name: 'Eventi/Feste', details: {} }, { name: 'Asporto', details: {} }] }
            ];
            this.save();
        }
    }

    migrate(data) {
        return data.map(cat => ({
            ...cat,
            subcategories: cat.subcategories.map(s => {
                if (typeof s === 'string') return { name: s, details: {} };
                return s;
            })
        }));
    }

    save() {
        localStorage.setItem('pn_cat_ristorante', JSON.stringify(this.categories));
        localStorage.setItem('pn_categories', JSON.stringify(this.categories));
        this.updatedAt = new Date().toISOString();
        if (CategoryManager.onDataChange) CategoryManager.onDataChange('categories');
    }

    getCategories() {
        return this.categories;
    }

    addCategory(name) {
        if (!window.Validator.isNotEmpty(name)) {
            window.showToast("Il nome della categoria non può essere vuoto", "error");
            return;
        }
        const id = Date.now();
        this.categories.push({ id, name, subcategories: [], createdAt: new Date().toISOString() });
        this.save();
        window.showToast("Categoria aggiunta con successo", "success");
    }

    editCategory(id, newName) {
        const cat = this.categories.find(c => c.id == id);
        if (cat) {
            cat.name = newName;
            this.save();
        }
    }

    deleteCategory(id) {
        // La conferma rimane modale poiché distruttiva, ma il feedback sarà Toast
        if (confirm('Eliminare questa categoria e tutte le sottocategorie?')) {
            this.categories = this.categories.filter(c => c.id != id);
            this.save();
            window.showToast("Categoria eliminata", "success");
        }
    }

    addSubcategory(categoryId, name, details = {}) {
        const cat = this.categories.find(c => c.id == categoryId);
        if (cat) {
            cat.subcategories.push({ name, details });
            this.save();
        }
    }

    editSubcategory(catId, oldName, newName, newDetails = null) {
        const cat = this.categories.find(c => c.id == catId);
        if (cat) {
            const sub = cat.subcategories.find(s => s.name === oldName);
            if (sub) {
                sub.name = newName;
                if (newDetails) sub.details = newDetails;
                this.save();
            }
        }
    }

    deleteSubcategory(catId, name) {
        const cat = this.categories.find(c => c.id == catId);
        if (cat) {
            cat.subcategories = cat.subcategories.filter(s => (s.name || s) !== name);
            this.save();
        }
    }
}

class TransactionManager {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('pn_trx_ristorante')) || JSON.parse(localStorage.getItem('pn_transactions')) || [];
    }

    save() {
        localStorage.setItem('pn_trx_ristorante', JSON.stringify(this.transactions));
        localStorage.setItem('pn_transactions', JSON.stringify(this.transactions)); // Backward compatibility
        if (CategoryManager.onDataChange) CategoryManager.onDataChange('transactions');
    }

    addTransaction(type, amount, date, category, subcategory, description) {
        if (!window.Validator.isMoney(amount)) {
            window.showToast("Importo non valido", "error");
            return null;
        }
        const transaction = {
            id: Date.now(),
            type,
            amount: parseFloat(amount),
            date: date || new Date().toISOString().split('T')[0],
            category,
            subcategory,
            description,
            createdAt: new Date().toISOString()
        };
        this.transactions.push(transaction);
        this.save();
        window.showToast(`${type === 'entrata' ? 'Incasso' : 'Spesa'} registrata con successo`, "success");
        return transaction;
    }

    getTotals() {
        let entrate = 0;
        let uscite = 0;
        this.transactions.forEach(t => {
            if (t.type === 'entrata') entrate += t.amount;
            else uscite += t.amount;
        });
        return { entrate, uscite, saldo: entrate - uscite };
    }

    getRecent(limit = 10) {
        return [...this.transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
    }
}

class ClientManager {
    constructor() {
        this.clients = JSON.parse(localStorage.getItem('pn_clients')) || [
            { id: 1, name: 'WebStudio Pro', email: 'info@webstudio.it', city: 'Milano' },
            { id: 2, name: 'Rossi Forniture', email: 'ordini@rossi.com', city: 'Roma' },
            { id: 3, name: 'Studio Legale Bianchi', email: 'avv@bianchi.it', city: 'Torino' }
        ];
    }
    save() { 
        localStorage.setItem('pn_clients', JSON.stringify(this.clients)); 
        if (CategoryManager.onDataChange) CategoryManager.onDataChange('clients');
    }
    getClients() { return this.clients; }
    addClient(name, email, city) {
        this.clients.push({ id: Date.now(), name, email, city });
        this.save();
    }
}

class InventoryManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('pn_inventory')) || [
            { id: 1, name: 'Farina Tipo 0', quantity: 50, unit: 'kg', minStock: 10, category: 'Alimentari' },
            { id: 2, name: 'Vino Rosso della Casa', quantity: 120, unit: 'L', minStock: 20, category: 'Bevande' },
            { id: 3, name: 'Detersivo Lavastoviglie', quantity: 5, unit: 'L', minStock: 10, category: 'Materiale Consumo' }
        ];
    }
    save() { 
        localStorage.setItem('pn_inventory', JSON.stringify(this.items));
        if (CategoryManager.onDataChange) CategoryManager.onDataChange('inventory');
    }
    getItems() { return this.items; }
    addItem(name, quantity, unit, minStock, category) {
        this.items.push({ id: Date.now(), name, quantity: parseFloat(quantity), unit, minStock: parseFloat(minStock), category });
        this.save();
    }
    updateQuantity(id, change) {
        const item = this.items.find(i => i.id == id);
        if (item) {
            item.quantity += parseFloat(change);
            this.save();
        }
    }
}

class SupplierManager {
    constructor() {
        this.suppliers = JSON.parse(localStorage.getItem('pn_suppliers')) || [
            { id: 1, name: 'Global Food SpA', contact: 'Luca Bruni', category: 'Alimentari' },
            { id: 2, name: 'Cantine Sociali', contact: 'Maria Rossi', category: 'Bevande' }
        ];
        this.orders = JSON.parse(localStorage.getItem('pn_orders')) || [];
    }
    save() {
        localStorage.setItem('pn_suppliers', JSON.stringify(this.suppliers));
        localStorage.setItem('pn_orders', JSON.stringify(this.orders));
        if (CategoryManager.onDataChange) CategoryManager.onDataChange('suppliers');
    }
    getSuppliers() { return this.suppliers; }
    getOrders() { return this.orders; }
    addOrder(supplierId, items, total) {
        if (!window.Validator.isNotEmpty(items) || !window.Validator.isMoney(total)) {
            window.showToast("Dati ordine incompleti o errati", "error");
            return;
        }
        this.orders.push({ 
            id: Date.now(), 
            supplierId, 
            items, 
            total: parseFloat(total), 
            date: new Date().toISOString(), 
            status: 'Pendente',
            createdAt: new Date().toISOString()
        });
        this.save();
        window.showToast("Ordine registrato", "success");
    }
}

const catManager = new CategoryManager();
const transManager = new TransactionManager();
const clientManager = new ClientManager();
const invManager = new InventoryManager();
const supplierManager = new SupplierManager();

function logout() {
    localStorage.removeItem('pn_user_type');
    localStorage.removeItem('pn_user_name');
    location.reload();
}
