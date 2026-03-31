// Prima Nota Pro 1.0® - Accounting & Transactions Module (Robust Version)

window.renderCategories = function() {
    const container = mainContent;
    const categories = catManager.getCategories();

    container.innerHTML = `
        <div class="glass-card module-card fade-in" id="window-categories" style="width:100%; max-width:1400px;">
            ${getCardHeader('GESTIONE CATEGORIE', 'window.renderDashboard()')}
            <div class="card-body window-body" style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap:wrap; gap:1rem;">
                    <p style="color: #64748b; margin: 0;">Organizza i tuoi flussi finanziari con categorie e sottocategorie personalizzate.</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-secondary" onclick="window.generatePDF('Repertorio Categorie')">🖨️ STAMPA REPERTORIO</button>
                        <button class="btn-primary" onclick="window.showCatForm()">+ NUOVA CATEGORIA</button>
                    </div>
                </div>
                <div class="category-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;">
                    ${categories.map(c => `
                        <div class="glass-card category-card" style="padding: 1.5rem; border-top: 4px solid var(--eco-primary);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h3 style="margin:0; font-size:1.1rem;">${c.name}</h3>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="win-dot yellow" title="Modifica" onclick="window.editCat(${c.id}, '${c.name.replace(/'/g, "\\'")}')"></button>
                                    <button class="win-dot red" title="Elimina" onclick="window.deleteCat(${c.id})"></button>
                                </div>
                            </div>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1rem;">
                                ${c.subcategories.length === 0 ? '<p style="color: #64748b; font-size: 0.8rem; font-style: italic;">Nessuna sottocategoria</p>' : c.subcategories.map(s => `
                                    <span class="subcat-chip" style="background:rgba(0,0,0,0.03); padding:0.4rem 0.8rem; border-radius:10px; font-size:0.8rem; display:flex; align-items:center; gap:0.5rem; border:1px solid var(--glass-border);">
                                        ${s.name}
                                        <div style="display:flex; gap:0.3rem;">
                                            <span style="cursor:pointer; opacity:0.5;" onclick="window.editSub(${c.id}, '${s.name.replace(/'/g, "\\'")}', true)">✏️</span>
                                            <span style="cursor:pointer; opacity:0.5;" onclick="window.deleteSub(${c.id}, '${s.name.replace(/'/g, "\\'")}', true)">×</span>
                                        </div>
                                    </span>
                                `).join('')}
                            </div>
                            <button class="btn-secondary" style="width:100%; font-size: 0.7rem; padding: 0.4rem;" onclick="window.showSubForm(${c.id})">+ AGGIUNGI SOTTOCAT.</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};

window.showCatForm = function() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 400px;">
            ${getCardHeader('NUOVA CATEGORIA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem;">
                <label class="input-label">Nome Categoria *</label>
                <input type="text" id="new-cat-name" class="pn-input" placeholder="Es. Trasporti, Personale...">
                <button class="btn-primary" style="width: 100%; margin-top: 2rem;" onclick="window.confirmAddCat()">CREA CATEGORIA</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.confirmAddCat = function() {
    if (!window.Validator.validateField('new-cat-name', 'text')) {
        window.showToast("Nome categoria obbligatorio", "error");
        return;
    }
    const name = document.getElementById('new-cat-name').value;
    catManager.addCategory(name);
    document.querySelector('.modal-overlay').remove();
    window.renderCategories();
};

window.editCat = function(id, name) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 400px;">
            ${getCardHeader('MODIFICA CATEGORIA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem;">
                <label class="input-label">Nuovo Nome *</label>
                <input type="text" id="edit-cat-name" class="pn-input" value="${name}">
                <button class="btn-primary" style="width: 100%; margin-top: 2rem;" onclick="window.confirmEditCat(${id})">SALVA MODIFICHE</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.confirmEditCat = function(id) {
    if (!window.Validator.validateField('edit-cat-name', 'text')) return;
    const name = document.getElementById('edit-cat-name').value;
    catManager.editCategory(id, name);
    document.querySelector('.modal-overlay').remove();
    window.showToast("Categoria aggiornata", "success");
    window.renderCategories();
};

window.deleteCat = function(id) {
    catManager.deleteCategory(id);
    window.renderCategories();
};

window.showSubForm = function(catId) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 450px;">
            ${getCardHeader('NUOVA SOTTOCATEGORIA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <div><label class="input-label">Nome Sottocategoria *</label><input type="text" id="new-sub-name" class="pn-input" placeholder="Es. Manutenzioni, Carne..."></div>
                <div><label class="input-label">Note / Contatti</label><input type="text" id="new-sub-contacts" class="pn-input" placeholder="Es. Tel 02..."></div>
                <div><label class="input-label">Importo Predefinito (€)</label><input type="number" id="new-sub-salary" class="pn-input" placeholder="0.00" step="0.01"></div>
                <button class="btn-primary" style="width: 100%; margin-top: 1rem;" onclick="window.confirmAddSub(${catId})">AGGIUNGI</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.confirmAddSub = function(catId) {
    if (!window.Validator.validateField('new-sub-name', 'text')) return;
    const name = document.getElementById('new-sub-name').value;
    const contacts = document.getElementById('new-sub-contacts').value;
    const salary = document.getElementById('new-sub-salary').value;
    catManager.addSubcategory(catId, name, { contacts, salary });
    document.querySelector('.modal-overlay').remove();
    window.showToast("Sottocategoria aggiunta", "success");
    window.renderCategories();
};

window.editSub = function(catId, oldName, refreshCategories = true) {
    const cat = catManager.getCategories().find(c => c.id == catId);
    if (!cat) return;
    const sub = cat.subcategories.find(s => s.name === oldName) || { name: oldName, details: {} };
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 450px;">
            ${getCardHeader('MODIFICA SOTTOCAT.', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <div><label class="input-label">Nome *</label><input type="text" id="edit-sub-name" class="pn-input" value="${sub.name}"></div>
                <div><label class="input-label">Note / Contatti</label><input type="text" id="edit-sub-contacts" class="pn-input" value="${sub.details.contacts || ''}"></div>
                <div><label class="input-label">Importo Predefinito (€)</label><input type="number" id="edit-sub-salary" class="pn-input" value="${sub.details.salary || ''}" step="0.01"></div>
                <button class="btn-primary" style="width: 100%; margin-top: 1rem;" onclick="window.confirmEditSub(${catId}, '${oldName.replace(/'/g, "\\'")}', ${refreshCategories})">SALVA</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.confirmEditSub = function(catId, oldName, refreshCategories) {
    if (!window.Validator.validateField('edit-sub-name', 'text')) return;
    const name = document.getElementById('edit-sub-name').value;
    const contacts = document.getElementById('edit-sub-contacts').value;
    const salary = document.getElementById('edit-sub-salary').value;

    catManager.editSubcategory(catId, oldName, name, { contacts, salary });
    document.querySelector('.modal-overlay').remove();
    window.showToast("Sottocategoria aggiornata", "success");
    if (refreshCategories) window.renderCategories();
    else window.renderSubcategories();
};

window.deleteSub = function(catId, name, refreshCategories = true) {
    if (confirm(`Eliminare la sottocategoria ${name}?`)) {
        catManager.deleteSubcategory(catId, name);
        window.showToast("Sottocategoria eliminata", "success");
        if (refreshCategories) window.renderCategories();
        else window.renderSubcategories();
    }
};

window.renderSubcategories = function() {
    const categories = catManager.getCategories();
    let allSubs = [];
    categories.forEach(c => {
        c.subcategories.forEach(s => {
            allSubs.push({ ...s, parent: c.name, parentId: c.id });
        });
    });

    mainContent.innerHTML = `
        <div class="glass-card module-card fade-in" id="window-anagrafe" style="width:100%; max-width:1400px;">
            ${getCardHeader('ANAGRAFE RISORSE', 'window.renderDashboard()')}
            <div class="card-body window-body">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 2rem; flex-wrap:wrap; gap:1rem;">
                    <p style="color: #64748b; margin: 0;">Anagrafe dettagliata di tutte le risorse e sottocategorie aziendali.</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-secondary" onclick="window.generatePDF('Anagrafe Risorse')">🖨️ STAMPA ELENCO</button>
                        <button class="btn-primary" onclick="window.showGlobalSubForm()">+ AGGIUNGI RISORSA</button>
                    </div>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background:rgba(0,0,0,0.02)">
                        <tr style="text-align: left; color: var(--eco-accent); font-size: 0.8rem; text-transform: uppercase;">
                            <th style="padding: 1.2rem;">Risorsa / Contatti</th>
                            <th style="padding: 1.2rem;">Categoria Madre</th>
                            <th style="padding: 1.2rem;">Budget / Importo</th>
                            <th style="padding: 1.2rem; text-align: right;">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allSubs.length === 0 ? `<tr><td colspan="4" style="text-align: center; padding: 3rem; opacity:0.5;">Nessuna risorsa definita.</td></tr>` : allSubs.map(s => `
                            <tr style="border-bottom: 1px solid var(--glass-border);">
                                <td style="padding: 1.2rem;">
                                    <div style="font-weight: 700;">${s.name}</div>
                                    <div style="font-size: 0.75rem; opacity:0.6;">${s.details.contacts || '-'}</div>
                                </td>
                                <td style="padding: 1.2rem;"><span style="padding:0.2rem 0.6rem; background:rgba(0,0,0,0.05); border-radius:8px; font-size:0.75rem;">${s.parent}</span></td>
                                <td style="padding: 1.2rem; font-weight:800; color:var(--pn-green);">${s.details.salary ? '€ ' + parseFloat(s.details.salary).toLocaleString('it-IT') : '-'}</td>
                                <td style="padding: 1.2rem; text-align: right;">
                                    <button class="win-dot yellow" onclick="window.editSub(${s.parentId}, '${s.name.replace(/'/g, "\\'")}', false)"></button>
                                    <button class="win-dot red" onclick="window.deleteSub(${s.parentId}, '${s.name.replace(/'/g, "\\'")}', false)"></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

window.showGlobalSubForm = function() {
    const cats = catManager.getCategories();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 450px;">
            ${getCardHeader('NUOVA RISORSA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <div><label class="input-label">Categoria Madre</label>
                <select id="new-sub-catid" class="pn-input">
                    ${cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select></div>
                <div><label class="input-label">Nome Sottocategoria *</label><input type="text" id="new-sub-name" class="pn-input" placeholder="Es. DHL, Enel..."></div>
                <div><label class="input-label">Contatti</label><input type="text" id="new-sub-contacts" class="pn-input" placeholder="Email o Tel"></div>
                <div><label class="input-label">Importo Predefinito (€)</label><input type="number" id="new-sub-salary" class="pn-input" placeholder="0.00" step="0.01"></div>
                <button class="btn-primary" style="width: 100%; margin-top: 1rem;" onclick="window.confirmAddGlobalSub()">AGGIUNGI</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.confirmAddGlobalSub = function() {
    if (!window.Validator.validateField('new-sub-name', 'text')) return;
    const catId = document.getElementById('new-sub-catid').value;
    const name = document.getElementById('new-sub-name').value;
    const contacts = document.getElementById('new-sub-contacts').value;
    const salary = document.getElementById('new-sub-salary').value;
    catManager.addSubcategory(catId, name, { contacts, salary });
    document.querySelector('.modal-overlay').remove();
    window.showToast("Risorsa aggiunta", "success");
    window.renderSubcategories();
};

window.showTransactionForm = function(type) {
    const cats = catManager.getCategories();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 500px;">
            ${getCardHeader(type === 'entrata' ? 'NUOVA ENTRATA' : 'NUOVA USCITA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem;">
                    <div><label class="input-label">Importo (€) *</label><input type="number" id="trans-amount" class="pn-input" placeholder="0.00" step="0.01"></div>
                    <div><label class="input-label">Data *</label><input type="date" id="trans-date" class="pn-input" value="${new Date().toISOString().split('T')[0]}"></div>
                </div>
                <label class="input-label">Categoria *</label>
                <select id="trans-category" class="pn-input" style="margin-bottom: 1.2rem;" onchange="window.handleSubcategoryChange(this.value)">
                    <option value="">Seleziona...</option>
                    ${cats.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
                <label class="input-label">Sottocategoria / Risorsa</label>
                <div style="position: relative;">
                    <input type="text" id="trans-subcategory" class="pn-input" placeholder="Cerca o seleziona..." onfocus="window.handleSubcategorySearch(this.value)" oninput="window.handleSubcategorySearch(this.value)">
                    <div id="subcat-results" class="glass-card" style="display:none; position:absolute; width:100%; z-index:100; max-height: 200px; overflow-y:auto; margin-top: 5px; background:#fff; border:1px solid var(--glass-border); border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);"></div>
                </div>
                <label class="input-label" style="margin-top: 1.2rem;">Descrizione Movimento</label>
                <input type="text" id="trans-desc" class="pn-input" placeholder="Es. Fattura #123...">
                <button class="btn-primary" style="width: 100%; margin-top: 2rem; background: ${type === 'entrata' ? '#27ae60' : '#e74c3c'};" onclick="window.confirmAddTransaction('${type}')">REGISTRA MOVIMENTO</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.handleSubcategoryChange = function(catName) {
    const subInput = document.getElementById('trans-subcategory');
    if (subInput) {
        subInput.value = '';
        window.handleSubcategorySearch('');
    }
};

window.handleSubcategorySearch = function(query) {
    const catName = document.getElementById('trans-category').value;
    const cat = catManager.getCategories().find(c => c.name === catName);
    const dropdown = document.getElementById('subcat-results');
    if (!cat) { dropdown.style.display = 'none'; return; }
    const filtered = cat.subcategories.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
    if (filtered.length > 0) {
        dropdown.innerHTML = filtered.map(s => `
            <div style="padding: 0.8rem 1rem; cursor: pointer; border-bottom: 1px solid rgba(0,0,0,0.03);" 
                 onclick="document.getElementById('trans-subcategory').value='${s.name}'; document.getElementById('subcat-results').style.display='none'; if(${s.details.salary || 0} > 0) document.getElementById('trans-amount').value='${s.details.salary}';">
                <div style="font-weight: 700; color:var(--eco-text-title);">${s.name}</div>
                ${s.details.salary ? `<div style="font-size: 0.7rem; color: #27ae60;">Predefinito: € ${s.details.salary}</div>` : ''}
            </div>
        `).join('');
        dropdown.style.display = 'block';
    } else { dropdown.style.display = 'none'; }
};

window.confirmAddTransaction = function(type) {
    const amountVal = window.Validator.validateField('trans-amount', 'money');
    const dateVal = window.Validator.validateField('trans-date', 'date');
    const catVal = window.Validator.validateField('trans-category', 'text');
    
    if (!amountVal || !dateVal || !catVal) {
        window.showToast("Compila correttamente i campi obbligatori", "error");
        return;
    }

    const amount = document.getElementById('trans-amount').value;
    const date = document.getElementById('trans-date').value;
    const category = document.getElementById('trans-category').value;
    const subcategory = document.getElementById('trans-subcategory').value;
    const desc = document.getElementById('trans-desc').value;

    transManager.addTransaction(type, amount, date, category, subcategory, desc);
    document.querySelector('.modal-overlay').remove();
    window.renderDashboard();
};
