// Prima Nota Pro 1.0® - Data Management Managers

class CategoryManager {
    static onDataChange = null;
    constructor() {
        const stored = JSON.parse(localStorage.getItem('pn_categories'));
        if (stored) {
            this.categories = this.migrate(stored);
        } else {
            this.categories = [
                { id: 1, name: 'Alimentari', subcategories: [{ name: 'Spesa', details: {} }, { name: 'Ristorante', details: {} }] },
                { id: 2, name: 'Trasporti', subcategories: [{ name: 'Carburante', details: {} }, { name: 'Mezzi Pubblici', details: {} }, { name: 'Manutenzione', details: {} }] },
                { id: 3, name: 'Casa', subcategories: [{ name: 'Affitto/Mutuo', details: {} }, { name: 'Bollette', details: {} }, { name: 'Arredamento', details: {} }] },
                { id: 4, name: 'Lavoro', subcategories: [{ name: 'Stipendio', details: {} }, { name: 'Bonus', details: {} }, { name: 'Rimborso Spese', details: {} }] }
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
        localStorage.setItem('pn_categories', JSON.stringify(this.categories));
        if (CategoryManager.onDataChange) CategoryManager.onDataChange('categories');
    }

    getCategories() {
        return this.categories;
    }

    addCategory(name) {
        const id = Date.now();
        this.categories.push({ id, name, subcategories: [] });
        this.save();
    }

    editCategory(id, newName) {
        const cat = this.categories.find(c => c.id == id);
        if (cat) {
            cat.name = newName;
            this.save();
        }
    }

    deleteCategory(id) {
        if (confirm('Eliminare questa categoria e tutte le sottocategorie?')) {
            this.categories = this.categories.filter(c => c.id != id);
            this.save();
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
        this.transactions = JSON.parse(localStorage.getItem('pn_transactions')) || [];
    }

    save() {
        localStorage.setItem('pn_transactions', JSON.stringify(this.transactions));
        if (CategoryManager.onDataChange) CategoryManager.onDataChange('transactions');
    }

    addTransaction(type, amount, date, category, subcategory, description) {
        const transaction = {
            id: Date.now(),
            type, // 'entrata' or 'uscita'
            amount: parseFloat(amount),
            date,
            category,
            subcategory,
            description
        };
        this.transactions.push(transaction);
        this.save();
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

const catManager = new CategoryManager();
const transManager = new TransactionManager();
const clientManager = new ClientManager();

function logout() {
    localStorage.removeItem('pn_user_type');
    localStorage.removeItem('pn_user_name');
    location.reload();
}
