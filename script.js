'use strict';
const Naval = function naval() {
    const elBody = document.querySelector('body');
    elBody.innerHTML += ``;
    let tableHTML = '<table>';

    for (let i = 1; i <= 10; i += 1) {
        tableHTML += '<tr>';
        for (let j = 1; j <= 10; j += 1) {
            tableHTML += `<td>${i}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    // Ajouter le tableau dans la page
    elBody.innerHTML += tableHTML;
    //elBody.innerHTML += styleHTML;
}
Naval();