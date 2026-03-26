// Prima Nota Pro 1.0® - Professional Print Engine

function generatePDF(title = "Report Prima Nota Pro") {
    const userName = localStorage.getItem('pn_user_name') || 'Utente';
    const company = localStorage.getItem('pn_company_name') || 'Studio Pro 1.0®';
    const date = new Date().toLocaleDateString('it-IT', { daylight: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Create a temporary print header
    const printHeader = document.createElement('div');
    printHeader.className = 'print-only-header';
    printHeader.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h1>${company}</h1>
                <p style="color: #64748b; margin-top: 0.5rem;">${title}</p>
            </div>
            <div style="text-align: right;">
                <p><strong>Operatore:</strong> ${userName}</p>
                <p><strong>Data Export:</strong> ${date}</p>
            </div>
        </div>
    `;

    document.body.prepend(printHeader);

    // Call native print
    window.print();

    // Cleanup after print
    setTimeout(() => {
        printHeader.remove();
    }, 1000);
}
