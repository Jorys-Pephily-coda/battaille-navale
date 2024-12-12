'use strict';

class Battleship {
    constructor() {
        this.elBody = document.querySelector('body');
        this.isGameOver = false;
        this.grid = [
            [3, 0, 0, 0, 0, 0, 0, 2, 2, 0],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 5, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 5, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 5, 0, 4, 0, 0],
            [3, 3, 3, 0, 0, 5, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
            [0, 0, 0, 0, 5, 5, 5, 5, 5, 0]
        ];

        this.run();
    }

    render() {     
        let tableHTML = '<table>';
        for (let i = -1; i < 10; i++) {
            tableHTML += "<tr>";
        
            for (let j = -1; j < 10; j++) {
                if (i == -1 && j == -1) {
                    tableHTML += `<th></th>`;
                } else if (i == -1 && j != -1) {
                    tableHTML += `<th>${j + 1}</th>`;
                } else if (j == -1 && i != -1) {
                    tableHTML += `<th>&#${65 + i}</th>`;
                } else {
                    tableHTML += `<td data-coord="${i}-${j}" id="${this.grid[i][j]}"></td>`;
                }
            }
            tableHTML += "</tr>";
        }
        tableHTML += '</table>';
        this.elBody.innerHTML = tableHTML;
    }

    getAdjacent(row, col) {
        const adjacent = [];
        const maxRows = this.grid.length;
        const maxCols = this.grid[0].length;

        if (row > 0){
            adjacent.push([row - 1, col]); // Haut
        } 
        if (row < maxRows - 1) {
            adjacent.push([row + 1, col]); // Bas
        } 
        if (col > 0) {
            adjacent.push([row, col - 1]); // Gauche
        }
        if (col < maxCols - 1) {
            adjacent.push([row, col + 1]); // Droite
        }

        return adjacent;
    }

    highlight(row, col) {
        const td = event.target;
        const adjacentCoords = this.getAdjacent(row, col);
        if (td.textContent == "O") {
            adjacentCoords.forEach(([adjRow, adjCol]) => {
            const cell = document.querySelector(`td[data-coord="${adjRow}-${adjCol}"]`);
            if (cell && !(cell.style.backgroundColor == 'red') && !(cell.style.backgroundColor == 'blue')) {
                cell.style.backgroundColor = 'lightgreen';
            }
        });
        }

    }

    onClickTds() {
        const cells = Array.from(document.querySelectorAll('td'));
        cells.forEach(td => {
            td.addEventListener('click', this.onClickTd.bind(this));
        });
    }

    onClickTd(event) {
        const td = event.target;
        const coord = td.dataset.coord;
        const [row, col] = coord.split('-').map(Number);

        if (td.classList.contains('clicked')) return;

        td.classList.add('clicked');

        if (this.grid[row][col] > 0) {
            td.textContent = "O";
            td.style.backgroundColor = 'red';
        } else {
            td.textContent = "X";
            td.style.backgroundColor = 'blue';
        }

        this.highlight(row, col);
        //this.checkWin();
    }

    /*checkWin() {
        const remainingShips = this.grid.flat().filter(cell => cell > 0);
        if (remainingShips.length === 0) {
            alert('Tous les bateaux sont coulés ! Vous avez gagné !');
            this.isGameOver = true;
        }
    }*/

    run() {
        this.render();
        this.onClickTds();
        //this.checkWin();
    }
}

const bat = new Battleship();
