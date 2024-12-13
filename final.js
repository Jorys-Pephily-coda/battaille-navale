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

    onClickTds() {
        const cells = Array.from(document.querySelectorAll('td'));
        cells.forEach(td => {
            td.addEventListener('click', this.onClickTd.bind(this));
        });
    }

    highlight(row, col) {
        const td = event.target;
        const cell = document.querySelector(`td[data-coord="${row}-${col}"]`);

        if (cell && !(cell.style.backgroundColor == 'red') && !(cell.style.backgroundColor == 'blue')) {
                cell.style.backgroundColor = 'lightgreen';
        }
    }

    onClickTds(event){
        const td = event.target;
        const coord = td.dataset.coord;
        const [row, col] = coord.split('-').map(Number);
        const btnConfirm = document.getElementById("post-data");
        btnConfirm.addEventListener("click", () => this.confirmChoice());


        if (td.classList.contains('clicked')) return;

        td.classList.add('clicked');
        this.highlight(row, col);
        this.confirmChoice(row,col/*,*/);
    }

    async confirmChoice(row,col/*,idShip*/){
        if (this.grid[row][col] > 0) {
            td.textContent = "O";
            td.style.backgroundColor = 'red';
        } else {
            td.textContent = "X";
            td.style.backgroundColor = 'blue';
        }
        const data = {
            "row-grid": row,
            "column-grid": col,
            "id-type-ship": this.grid[row][col],
            /*"id-ship": idShip,*/
          };
        
          await fetch("./post_user.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => console.log("Réponse PHP :", data));
    }

    run() {
        this.render();
        this.onClickTds();
        //this.checkWin();
    }
}