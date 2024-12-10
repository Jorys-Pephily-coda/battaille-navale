'use strict';
const grid = [
    [0, 3, 0, 0, 0, 0, 0, 0, 2, 2],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 4, 0],
    [0, 3, 3, 3, 0, 0, 5, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 5, 5, 5, 5, 5]
];
const Naval = function naval() {
    const elBody = document.querySelector('body');
    elBody.innerHTML += ``;
    let tableHTML = '<table>';
        if (grid.length < 11 && grid[1].length < 11){
            for (let i = 0; i < grid.length; i++) {
                tableHTML += "<tr>";
                for (let j = 0; j < grid[i].length; j++) {
                    tableHTML += `<td>${grid[i][j]}</td>`; 
                }
                tableHTML += "</tr>";
            }
        }
    tableHTML += '</table>';

    // Ajouter le tableau dans la page
    elBody.innerHTML += tableHTML;
    //elBody.innerHTML += styleHTML;
}
Naval();

onClickTd(event) {
    const td = event.target;
    const elH2  = document.querySelector('h2');
    const id = parseInt(td.dataset.id);

    elH2.innerHTML = `${this.setCurrentPlayer(this.currentPlayer)}'s Turn`;

    if (this.grid[id].textContent) return;

    this.grid[id].textContent = this.currentPlayer;
    this.currentPlayer = this.setCurrentPlayer(this.currentPlayer);

    if (this.checkWin()) {
        alert(`${this.setCurrentPlayer(this.currentPlayer)} a gagnÃ© !`);
        this.isGameOver = true;
    }

    if (this.checkDraw()) {
        alert("Match nul !");
        this.isGameOver = true;
    }

    if (this.isGameOver) {
        this.endGame();

        return;
    }
}
onClickTds() {
    this.grid.forEach(td => {
        td.addEventListener('click', this.onClickTd.bind(this))
    });
}