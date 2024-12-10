'use strict'

class MorpionXO {
    constructor() {
        this.el = document.querySelector('body');
        this.grid = [];
        this.currentPlayer = this.setCurrentPlayer(this.currentPlayer);
        this.isGameOver = false;
        this.run();
    }

    setCurrentPlayer(currentPlayer) {
        return currentPlayer === "X" ? "O" : "X";
    }

    render() {     
        return `
            <h1>Morpion</h1>
            <div class="grid">
                <table>
                    <tr>
                        <td data-id="0"></td>
                        <td data-id="1"></td>
                        <td data-id="2"></td>
                    </tr>
                    <tr>
                        <td data-id="3"></td>
                        <td data-id="4"></td>
                        <td data-id="5"></td>
                    </tr>
                    <tr>
                        <td data-id="6"></td>
                        <td data-id="7"></td>
                        <td data-id="8"></td>
                    </tr>
                </table>  
            </div>
            <h2></h2>
            <div class=replay></div>
        `;
    }

    onClickTds() {
        this.grid.forEach(td => {
            td.addEventListener('click', this.onClickTd.bind(this))
        });
    }

    checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;

            if (
                this.grid[a].textContent &&
                this.grid[a].textContent === this.grid[b].textContent &&
                this.grid[a].textContent === this.grid[c].textContent
            ) return true;
        }

        return false;
    }

    checkDraw() {
        return this.grid.every(td => td.textContent !== "");
    }

    onClickTd(event) {
        const td = event.target;
        const elH2  = document.querySelector('h2');
        const id = parseInt(td.dataset.id);

        elH2.innerHTML = `${this.setCurrentPlayer(this.currentPlayer)}'s Turn`;

        if (this.grid[id].textContent) return;

        this.grid[id].textContent = this.currentPlayer;
        this.currentPlayer = this.setCurrentPlayer(this.currentPlayer);

        if (this.checkWin()) {
            alert(`${this.setCurrentPlayer(this.currentPlayer)} a gagné !`);
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

    endGame() {
        const elH2  = document.querySelector('h2');
        const elReplay  = document.querySelector('.replay');

        elReplay.innerHTML = `<button class= "replay-button">Replay</button>`;
        elH2.innerHTML = ``;

        this.restart();
    }

    restart() {
        const elReplayBtn = document.querySelector('.replay-button');

        elReplayBtn.addEventListener('click', function(e) {
            e.preventDefault();
   
            new MorpionXO();
        });
    }   

    run(){
        this.el.innerHTML = this.render();
        this.grid = Array.from(document.querySelectorAll('td'));
        this.onClickTds();
    }
}

new MorpionXO();

/*
'use strict';

class battleship {
    constructor(){
        this.elBody = document.querySelector('body');
        this.grid [
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
    }
}

const Naval = function naval() {
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
*/