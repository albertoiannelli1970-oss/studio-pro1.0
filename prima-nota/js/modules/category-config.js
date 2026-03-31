// Prima Nota Pro 1.0® - Category Configuration Module

function renderCatConfig() {
    const categories = catManager.getCategories();
    const userName = localStorage.getItem('pn_user_name') || 'Ristorante';

    mainContent.innerHTML = `
        <div class="glass-card fade-in" style="width:100%; max-width:1400px;">
            ${window.getCardHeader(`CONFIGURAZIONE CATEGORIE: ${userName}`, "window.showSection('dashboard')")}
            <div style="padding:2.5rem;">
                ${window.renderPageHero("Struttura Finanziaria", "Personalizza le categorie e sottocategorie per un bilancio su misura.", "CONFIGURAZIONE")}

                <div style="display: flex; justify-content: flex-end; margin-bottom: 2rem;">
                    <button class="btn-primary" onclick="window.showCatForm()">+ NUOVA CATEGORIA MADRE</button>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
                    ${categories.map(cat => `
                        <div class="glass-card" style="padding: 2rem; border-radius: 24px; position:relative; border-top: 5px solid var(--eco-primary);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                                <h3 style="margin: 0; font-size: 1.3rem; color: var(--eco-text-title);">${cat.name}</h3>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="win-dot yellow" onclick="window.editCat(${cat.id}, '${cat.name.replace(/'/g, "\\'")}')"></button>
                                    <button class="win-dot red" onclick="window.deleteCat(${cat.id})"></button>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
                                ${cat.subcategories.map(sub => `
                                    <div style="padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.02); display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-weight: 700; font-size: 0.9rem;">${sub.name}</span>
                                        <div style="display: flex; gap: 0.4rem;">
                                            <button class="win-dot yellow" style="width:12px; height:12px;" onclick="window.editSub(${cat.id}, '${sub.name.replace(/'/g, "\\'")}', true)"></button>
                                            <button class="win-dot red" style="width:12px; height:12px;" onclick="window.deleteSub(${cat.id}, '${sub.name.replace(/'/g, "\\'")}', true)"></button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <button class="btn-indigo" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; background: rgba(39, 174, 96, 0.1); color: #27ae60; border-color: #27ae60;" onclick="window.showSubForm(${cat.id})">
                                + Aggiungi Sottocategoria
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

window.renderCatConfig = renderCatConfig;
