'use strict';

class battleship {
    constructor(){
        this.elBody = document.querySelector('body');
        //this.currentPlayer = this.setCurrentPlayer(this.currentPlayer);
        this.isGameOver = false;
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 2, 2, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0, 4, 0, 0],
            [0, 3, 3, 3, 0, 0, 5, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0]
        ];
        
        this.run();
    }

    render() {     
        this.elBody.innerHTML += ``;
        let tableHTML = '<table>';
                for (let i = 0; i < this.grid.length; i++) {
                    tableHTML += "<tr>";
                    for (let j = 0; j < this.grid[i].length; j++) {
                        if (i == 0 && j == 0){
                            tableHTML += `<th ></th>`;
                        }else if ( i == 0 ){
                            tableHTML += `<th >${j}</th>`;
                        } else if (j == 0){
                            tableHTML += `<th >&#${64 + i}</th>`;
                        }else {
                            tableHTML += `<td>${this.grid[i][j]}</td>`; 
                        }

                    }
                    tableHTML += "</tr>";
                }
        tableHTML += '</table>';
    
        // Ajouter le tableau dans la page
        this.elBody.innerHTML += tableHTML;
        return this.elBody.innerHTML;
    }
    onClickTds() {
        this.grid.forEach(td => {
            td.addEventListener('click', this.onClickTd.bind(this))
        });
    }
    onClickTd(event) {
        const td = event.target;
        const elH2  = document.querySelector('h2');
        const id = parseInt(td.dataset.id);
        
        elH2.innerHTML = `${this.setCurrentPlayer(this.currentPlayer)}'s Turn`;
        
        if (this.grid[id].textContent) return;
    
        this.grid[id].textContent = this.currentPlayer;
        this.currentPlayer = this.setCurrentPlayer(this.currentPlayer);
        
        /*if (this.checkWin()) {
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
        }*/
    }
    run(){
        this.elBody.innerHTML = this.render();
    }
}
const bat = new battleship();