// Food Cost Pro 1.0® - Culinary Intelligence Module

window.renderFoodCost = function() {
    const recipes = foodManager.recipes;
    const ingredients = foodManager.ingredients;
    const userName = localStorage.getItem('pn_user_name') || 'Chef';

    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="width:100%; max-width:1400px;">
            ${window.getCardHeader(`FOOD COST PRO 1.0®: ${userName}`, "window.showSection('dashboard')")}
            <div style="padding:2.5rem;">
                ${window.renderPageHero("Ingegneria del Menù", "Calcola il costo esatto di ogni piatto e ottimizza i tuoi margini di profitto.", "CULINARY INTELLIGENCE")}

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap:wrap; gap:1rem;">
                    <div style="display:flex; gap:1rem;">
                        <button class="btn-primary" onclick="window.showRecipeForm()">+ NUOVA RICETTA</button>
                        <button class="btn-secondary" onclick="window.showIngredientList()">📦 GESTIONE INGREDIENTI</button>
                    </div>
                    <div style="display:flex; gap:0.5rem; background:rgba(0,0,0,0.05); padding:0.5rem 1rem; border-radius:12px;">
                        <span style="font-size:0.8rem; font-weight:700; opacity:0.6;">RICETTE TOTALI: ${recipes.length}</span>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem;">
                    ${recipes.length === 0 ? `
                        <div class="glass-card" style="grid-column: 1/-1; padding: 4rem; text-align: center; opacity: 0.6;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍🍳</div>
                            <h3>Inizia a creare il tuo menù digitale</h3>
                            <p>Aggiungi la tua prima ricetta per analizzarne i costi.</p>
                        </div>
                    ` : recipes.map(r => renderRecipeCard(r)).join('')}
                </div>
            </div>
        </div>
    `;
};

function renderRecipeCard(r) {
    const cost = foodManager.calculateRecipeCost(r.id);
    return `
        <div class="glass-card" style="padding: 2rem; border-radius: 24px; border-top: 5px solid var(--eco-primary);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                <div>
                    <h3 style="margin: 0; font-size: 1.4rem;">${r.name}</h3>
                    <span class="badge-indigo" style="font-size:0.7rem;">${r.category}</span>
                </div>
                <div style="display: flex; gap: 0.4rem;">
                    <button class="win-dot yellow" onclick="window.editRecipe(${r.id})"></button>
                    <button class="win-dot red" onclick="window.deleteRecipe(${r.id})"></button>
                </div>
            </div>

            <div style="background: rgba(0,0,0,0.02); padding: 1.2rem; border-radius: 16px; margin-bottom: 1.5rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <span style="font-size:0.85rem; opacity:0.7;">Costo Piatto:</span>
                    <span style="font-weight:800; color:var(--pn-red);">${window.formatMoney(cost)}</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="font-size:0.85rem; opacity:0.7;">Margine Stimato:</span>
                    <span style="font-weight:800; color:var(--pn-green);">65%</span>
                </div>
            </div>

            <button class="btn-indigo" style="width:100%;" onclick="window.showRecipeDetails(${r.id})">DETTAGLI SCHEDA TECNICA</button>
        </div>
    `;
}

window.showRecipeForm = function() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 600px;">
            ${window.getCardHeader('NUOVA RICETTA PROFESSIONALE', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2.5rem; display:flex; flex-direction:column; gap:1.5rem;">
                <div>
                    <label class="input-label">Nome del Piatto *</label>
                    <input type="text" id="rec-name" class="pn-input" placeholder="Es. Risotto ai Porcini">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div>
                        <label class="input-label">Categoria</label>
                        <select id="rec-cat" class="pn-input">
                            <option>Antipasti</option><option>Primi</option><option>Secondi</option><option>Dessert</option>
                        </select>
                    </div>
                    <div>
                        <label class="input-label">Costi Fissi Esterni (€)</label>
                        <input type="number" id="rec-fixed" class="pn-input" value="0.50" step="0.10">
                    </div>
                </div>
                <button class="btn-primary" style="width:100%; margin-top:1rem;" onclick="window.saveRecipe()">CREA SCHEDA RICETTA</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.saveRecipe = function() {
    if (!window.Validator.validateField('rec-name', 'text')) return;
    const name = document.getElementById('rec-name').value;
    const cat = document.getElementById('rec-cat').value;
    const fixed = document.getElementById('rec-fixed').value;
    
    foodManager.addRecipe(name, cat, [], fixed);
    window.showToast("Scheda ricetta creata con successo", "success");
    document.querySelector('.modal-overlay').remove();
    window.renderFoodCost();
};

window.showIngredientList = function() {
    const ings = foodManager.ingredients;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 800px; height: 90vh; overflow:auto;">
            ${window.getCardHeader('ARCHIVIO MATERIE PRIME', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2.5rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:2rem;">
                     <button class="btn-primary" onclick="window.showIngredientForm()">+ AGGIUNGI INGREDIENTE</button>
                </div>
                <table style="width:100%; border-collapse:collapse;">
                    <thead style="background:rgba(0,0,0,0.02)">
                        <tr style="text-align:left; font-size:0.8rem; text-transform:uppercase; color:var(--eco-accent);">
                            <th style="padding:1rem;">Materia Prima</th>
                            <th style="padding:1rem;">Prezzo/Unità</th>
                            <th style="padding:1rem; text-align:right;">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ings.length === 0 ? '<tr><td colspan="3" style="text-align:center; padding:3rem; opacity:0.5;">Nessun ingrediente in archivio.</td></tr>' : ings.map(i => `
                            <tr style="border-bottom:1px solid var(--glass-border)">
                                <td style="padding:1rem; font-weight:700;">${i.name}</td>
                                <td style="padding:1rem;">${window.formatMoney(i.price)} / ${i.unit}</td>
                                <td style="padding:1rem; text-align:right;">
                                    <button class="win-dot red" onclick="window.deleteIngredient(${i.id})"></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.showIngredientForm = function() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fade-in';
    overlay.style.zIndex = "2000";
    overlay.innerHTML = `
        <div class="form-card" style="max-width: 400px; margin-top: 5vh;">
            ${window.getCardHeader('NUOVA MATERIA PRIMA', 'this.closest(\'.modal-overlay\').remove()')}
            <div class="card-body" style="padding: 2rem; display:flex; flex-direction:column; gap:1.2rem;">
                <div><label class="input-label">Nome Ingrediente *</label><input type="text" id="ing-name" class="pn-input"></div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div><label class="input-label">Unità</label><select id="ing-unit" class="pn-input"><option>kg</option><option>lt</option><option>pz</option></select></div>
                    <div><label class="input-label">Prezzo (€)</label><input type="number" id="ing-price" class="pn-input" step="0.01"></div>
                </div>
                <button class="btn-primary" style="width:100%; margin-top:1rem;" onclick="window.saveIngredient()">SALVA NELL'ARCHIVIO</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.saveIngredient = function() {
    if (!window.Validator.validateField('ing-name', 'text') || !window.Validator.validateField('ing-price', 'money')) return;
    const name = document.getElementById('ing-name').value;
    const unit = document.getElementById('ing-unit').value;
    const price = document.getElementById('ing-price').value;
    
    foodManager.addIngredient(name, unit, price);
    window.showToast("Ingrediente salvato", "success");
    document.querySelector('.modal-overlay').remove();
    window.showIngredientList(); // Refresh list
};

window.deleteRecipe = (id) => {
    if (confirm("Eliminare questa ricetta?")) {
        foodManager.recipes = foodManager.recipes.filter(r => r.id !== id);
        foodManager.save();
        window.showToast("Ricetta eliminata", "success");
        window.renderFoodCost();
    }
};

window.deleteIngredient = (id) => {
    if (confirm("Eliminare questo ingrediente?")) {
        foodManager.ingredients = foodManager.ingredients.filter(i => i.id !== id);
        foodManager.save();
        window.showToast("Ingrediente eliminato", "success");
        window.showIngredientList();
    }
};
