function renderCategories() {
    const container = mainContent;
    const categories = catManager.getCategories();

    container.innerHTML = `
        <div class="glass-card module-card fade-in" id="window-categories">
            ${getCardHeader('GESTIONE CATEGORIE', 'window.renderDashboard()', 'window.toggleWindow(\'window-categories\')', 'window.maximizeWindow(\'window-categories\')')}
            <div class="card-body window-body" style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <p style="color: #64748b; margin: 0;">Organizza i tuoi flussi finanziari con categorie e sottocategorie personalizzate.</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-indigo" onclick="window.generatePDF('Repertorio Categorie')">🖨️ STAMPA REPERTORIO</button>
                        <button class="btn-indigo" onclick="window.showCatForm()">+ NUOVA CATEGORIA</button>
                    </div>
                </div>
                <div class="category-grid">
                    ${categories.map(c => `
                        <div class="glass-card category-card">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h3 style="margin:0;">${c.name}</h3>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="btn-icon-small" onclick="window.editCat(${c.id}, '${c.name.replace(/'/g, "\\'")}')">✏️</button>
                                    <button class="btn-icon-small" onclick="window.deleteCat(${c.id})">🗑️</button>
                                    <button class="btn-indigo" style="font-size: 0.65rem; padding: 0.4rem 0.8rem;" onclick="window.showSubForm(${c.id})">+ AGGIUNGI</button>
                                </div>
                            </div>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
                                ${c.subcategories.length === 0 ? '<p style="color: #64748b; font-size: 0.8rem; font-style: italic;">Nessuna sottocategoria</p>' : c.subcategories.map(s => `
                                    <span class="subcat-chip" title="${(s.details && s.details.contacts) ? '📞 ' + s.details.contacts : 'Nessun dettaglio'}">
                                        ${s.name}
                                        <div class="subcat-actions">
                                            <span onclick="window.editSub(${c.id}, '${s.name.replace(/'/g, "\\'")}', true)">✏️</span>
                                            <span onclick="window.deleteSub(${c.id}, '${s.name.replace(/'/g, "\\'")}', true)">×</span>
                                        </div>
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showCatForm() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="glass-card onboarding-card" style="max-width: 400px; padding: 2.5rem;">
            ${getCardHeader('NUOVA CATEGORIA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem;">
                <label class="input-label">Nome Categoria</label>
                <input type="text" id="new-cat-name" class="pn-input" placeholder="Es. Trasporti, Casa...">
                <button class="btn-indigo" style="width: 100%; margin-top: 2rem;" onclick="window.confirmAddCat()">CREA CATEGORIA</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function confirmAddCat() {
    const name = document.getElementById('new-cat-name').value;
    if (name) {
        catManager.addCategory(name);
        document.querySelector('.modal-overlay').remove();
        renderCategories();
    }
}

function editCat(id, name) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="glass-card onboarding-card" style="max-width: 450px; padding: 2.5rem;">
            ${getCardHeader('MODIFICA CATEGORIA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem;">
                <label class="input-label">Nuovo Nome</label>
                <input type="text" id="edit-cat-name" class="pn-input" value="${name}">
                <button class="btn-indigo" style="width: 100%; margin-top: 2rem;" onclick="window.confirmEditCat(${id})">SALVA MODIFICHE</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function confirmEditCat(id) {
    const name = document.getElementById('edit-cat-name').value;
    if (name) {
        catManager.editCategory(id, name);
        document.querySelector('.modal-overlay').remove();
        renderCategories();
    }
}

function deleteCat(id) {
    catManager.deleteCategory(id);
    renderCategories();
}

function showSubForm(catId) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="glass-card onboarding-card" style="max-width: 450px; padding: 2.5rem;">
            ${getCardHeader('AGGIUNGI SOTTOCATEGORIA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 1.5rem;">
                <label class="input-label">Nome Sottocategoria</label>
                <input type="text" id="new-sub-name" class="pn-input" placeholder="Es. Carburante, Bollette...">
                
                <h4 style="margin: 1.5rem 0 0.5rem; font-size: 0.8rem; color: #64748b;">DETTAGLI (OPZIONALE)</h4>
                <input type="text" id="new-sub-contacts" class="pn-input" placeholder="Contatti (Email, Tel)" style="margin-bottom: 0.8rem;">
                <input type="number" id="new-sub-salary" class="pn-input" placeholder="Importo Predefinito / Stipendio" style="margin-bottom: 0.8rem;">
                <input type="text" id="new-sub-contract" class="pn-input" placeholder="Note / Tipo Contratto">

                <button class="btn-indigo" style="width: 100%; margin-top: 2rem;" onclick="window.confirmAddSub(${catId})">AGGIUNGI</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function confirmAddSub(catId) {
    const name = document.getElementById('new-sub-name').value;
    const contacts = document.getElementById('new-sub-contacts').value;
    const salary = document.getElementById('new-sub-salary').value;
    const contract = document.getElementById('new-sub-contract').value;

    if (name) {
        catManager.addSubcategory(catId, name, { contacts, salary, contract });
        document.querySelector('.modal-overlay').remove();
        renderCategories();
    }
}

function editSub(catId, oldName, refreshCategories = true) {
    const cat = catManager.getCategories().find(c => c.id == catId);
    const sub = cat.subcategories.find(s => s.name === oldName);

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="glass-card onboarding-card" style="max-width: 450px; padding: 2.5rem;">
            ${getCardHeader('MODIFICA SOTTOCATEGORIA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 1.5rem;">
                <label class="input-label">Nome Sottocategoria</label>
                <input type="text" id="edit-sub-name" class="pn-input" value="${sub.name}">
                
                <h4 style="margin: 1.5rem 0 0.5rem; font-size: 0.8rem; color: #64748b;">DETTAGLI</h4>
                <input type="text" id="edit-sub-contacts" class="pn-input" value="${sub.details.contacts || ''}" placeholder="Contatti">
                <input type="number" id="edit-sub-salary" class="pn-input" value="${sub.details.salary || ''}" placeholder="Importo">
                <input type="text" id="edit-sub-contract" class="pn-input" value="${sub.details.contract || ''}" placeholder="Contratto">

                <button class="btn-indigo" style="width: 100%; margin-top: 2rem;" onclick="window.confirmEditSub(${catId}, '${oldName.replace(/'/g, "\\'")}', ${refreshCategories})">SALVA</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function confirmEditSub(catId, oldName, refreshCategories) {
    const name = document.getElementById('edit-sub-name').value;
    const contacts = document.getElementById('edit-sub-contacts').value;
    const salary = document.getElementById('edit-sub-salary').value;
    const contract = document.getElementById('edit-sub-contract').value;

    if (name) {
        catManager.editSubcategory(catId, oldName, name, { contacts, salary, contract });
        document.querySelector('.modal-overlay').remove();
        if (refreshCategories) renderCategories();
        else renderSubcategories();
    }
}

function deleteSub(catId, name, refreshCategories = true) {
    if (confirm(`Eliminare la sottocategoria ${name}?`)) {
        catManager.deleteSubcategory(catId, name);
        if (refreshCategories) renderCategories();
        else renderSubcategories();
    }
}

function renderSubcategories() {
    const container = mainContent;
    const categories = catManager.getCategories();
    let allSubs = [];

    categories.forEach(c => {
        c.subcategories.forEach(s => {
            allSubs.push({ ...s, parent: c.name, parentId: c.id });
        });
    });

    container.innerHTML = `
        <div class="glass-card module-card fade-in" id="window-anagrafe">
            ${getCardHeader('ANAGRAFE RISORSE', 'window.renderDashboard()', 'window.toggleWindow(\'window-anagrafe\')', 'window.maximizeWindow(\'window-anagrafe\')')}
            <div class="card-body window-body">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.03);">
                    <p style="color: #64748b; margin: 0;">Gestione dettagliata di tutte le sottocategorie e risorse aziendali.</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-indigo" onclick="window.generatePDF('Anagrafe Risorse & Sottocategorie')">🖨️ STAMPA ELENCO</button>
                        <button class="btn-indigo" onclick="window.showGlobalSubForm()">+ AGGIUNGI SOTTOCATEGORIA</button>
                    </div>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                    <thead>
                        <tr style="text-align: left; border-bottom: 2px solid rgba(255,255,255,0.05); color: #64748b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">
                            <th style="padding: 1.2rem;">Nome / Risorsa / Contatti</th>
                            <th style="padding: 1.2rem;">Categoria Madre</th>
                            <th style="padding: 1.2rem;">Settaggio Economico / Contratto</th>
                            <th style="padding: 1.2rem; text-align: right;">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allSubs.length === 0 ? `<tr><td colspan="4" style="text-align: center; padding: 3rem; color: #64748b;">Nessuna sottocategoria definita.</td></tr>` : allSubs.map(s => `
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                                <td style="padding: 1.2rem;">
                                    <div style="font-weight: 600;">${s.name}</div>
                                    <div style="font-size: 0.75rem; color: #64748b;">${s.details.contacts || 'Nessun contatto'}</div>
                                </td>
                                <td style="padding: 1.2rem;"><span class="badge-indigo" style="font-size: 0.7rem;">${s.parent}</span></td>
                                <td style="padding: 1.2rem;">
                                    <div style="font-size: 0.85rem; color: var(--pn-green); font-weight: 700;">${s.details.salary ? '€ ' + parseFloat(s.details.salary).toLocaleString('it-IT') : '-'}</div>
                                    <div style="font-size: 0.7rem; color: #64748b;">${s.details.contract || ''}</div>
                                </td>
                                <td style="padding: 1.2rem; text-align: right;">
                                    <button class="btn-icon-small" onclick="window.editSub(${s.parentId}, '${s.name.replace(/'/g, "\\'")}', false)">✏️</button>
                                    <button class="btn-icon-small" onclick="window.deleteSub(${s.parentId}, '${s.name.replace(/'/g, "\\'")}', false)">🗑️</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function showGlobalSubForm() {
    const cats = catManager.getCategories();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="glass-card onboarding-card" style="max-width: 450px; padding: 2.5rem;">
            ${getCardHeader('NUOVA RISORSA / SOTTO-CAT', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 1.5rem;">
                <label class="input-label">Categoria Madre</label>
                <select id="new-sub-catid" class="pn-input" style="margin-bottom: 1rem;">
                    ${cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>

                <label class="input-label">Nome Sottocategoria</label>
                <input type="text" id="new-sub-name" class="pn-input" placeholder="Es. Manutenzione, Carburante...">
                
                <h4 style="margin: 1.5rem 0 0.5rem; font-size: 0.8rem; color: #64748b;">DETTAGLI</h4>
                <input type="text" id="new-sub-contacts" class="pn-input" placeholder="Contatti">
                <input type="number" id="new-sub-salary" class="pn-input" placeholder="Importo predefinito">

                <button class="btn-indigo" style="width: 100%; margin-top: 2rem;" onclick="window.confirmAddGlobalSub()">AGGIUNGI RISORSA</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function confirmAddGlobalSub() {
    const catId = document.getElementById('new-sub-catid').value;
    const name = document.getElementById('new-sub-name').value;
    const contacts = document.getElementById('new-sub-contacts').value;
    const salary = document.getElementById('new-sub-salary').value;

    if (name) {
        catManager.addSubcategory(catId, name, { contacts, salary });
        document.querySelector('.modal-overlay').remove();
        renderSubcategories();
    }
}

function showTransactionForm(type) {
    const cats = catManager.getCategories();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="glass-card onboarding-card" style="max-width: 500px; padding: 2.5rem;">
            ${getCardHeader(type === 'entrata' ? 'NUOVA ENTRATA' : 'NUOVA USCITA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 1.5rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label class="input-label">Importo (€)</label>
                        <input type="number" id="trans-amount" class="pn-input" placeholder="0.00" step="0.01">
                    </div>
                    <div>
                        <label class="input-label">Data</label>
                        <input type="date" id="trans-date" class="pn-input" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>

                <label class="input-label">Categoria</label>
                <select id="trans-category" class="pn-input" style="margin-bottom: 1rem;" onchange="window.handleSubcategoryChange(this.value)">
                    <option value="">Seleziona...</option>
                    ${cats.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>

                <label class="input-label">Sottocategoria / Risorsa</label>
                <div style="position: relative;">
                    <input type="text" id="trans-subcategory" class="pn-input" placeholder="Cerca o seleziona..." onfocus="window.handleSubcategorySearch(this.value)" oninput="window.handleSubcategorySearch(this.value)">
                    <div id="subcat-results" class="glass-card search-results-dropdown" style="display:none; position:absolute; width:100%; z-index:100; max-height: 200px; overflow-y:auto; margin-top: 5px;"></div>
                </div>

                <label class="input-label" style="margin-top: 1rem;">Descrizione Movimento</label>
                <input type="text" id="trans-desc" class="pn-input" placeholder="Es. Fattura #123, Acquisto materiale...">

                <button class="btn-indigo" style="width: 100%; margin-top: 2rem; background: ${type === 'entrata' ? 'var(--pn-green)' : 'var(--pn-red)'};" onclick="window.confirmAddTransaction('${type}')">REGISTRA MOVIMENTO</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function handleSubcategoryChange(catName) {
    const cat = catManager.getCategories().find(c => c.name === catName);
    const subInput = document.getElementById('trans-subcategory');
    subInput.value = '';
    handleSubcategorySearch('');
}

function handleSubcategorySearch(query) {
    const catName = document.getElementById('trans-category').value;
    const cat = catManager.getCategories().find(c => c.name === catName);
    const dropdown = document.getElementById('subcat-results');
    
    if (!cat) {
        dropdown.style.display = 'none';
        return;
    }

    const filtered = cat.subcategories.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
    
    if (filtered.length > 0) {
        dropdown.innerHTML = filtered.map(s => `
            <div style="padding: 0.8rem 1rem; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.03);" 
                 onclick="document.getElementById('trans-subcategory').value='${s.name}'; document.getElementById('subcat-results').style.display='none'; if(${s.details.salary}) document.getElementById('trans-amount').value='${s.details.salary}';">
                <div style="font-weight: 600;">${s.name}</div>
                ${s.details.salary ? `<div style="font-size: 0.7rem; color: var(--pn-green);">Importo predefinito: €${s.details.salary}</div>` : ''}
            </div>
        `).join('');
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

function confirmAddTransaction(type) {
    const amount = document.getElementById('trans-amount').value;
    const date = document.getElementById('trans-date').value;
    const category = document.getElementById('trans-category').value;
    const subcategory = document.getElementById('trans-subcategory').value;
    const desc = document.getElementById('trans-desc').value;

    if (amount && date && category) {
        transManager.addTransaction(type, amount, date, category, subcategory, desc);
        document.querySelector('.modal-overlay').remove();
        renderDashboard();
    } else {
        alert('Compila i campi obbligatori (Importo, Data, Categoria).');
    }
}
