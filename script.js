'use strict';

class battleship {
    constructor(){
        this.elBody = document.querySelector('body');
        //this.currentPlayer = this.setCurrentPlayer(this.currentPlayer);
        this.isGameOver = false;
        this.grid = [
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
        
        this.run();
    }

    render() {     
        this.elBody.innerHTML += ``;
        let tableHTML = '<table>';
            if (this.grid.length < 11 && this.grid[1].length < 11){
                for (let i = 0; i < this.grid.length; i++) {
                    tableHTML += "<tr>";
                    for (let j = 0; j < this.grid[i].length; j++) {
                        tableHTML += `<td>${this.grid[i][j]}</td>`; 
                    }
                    tableHTML += "</tr>";
                }
            }
        tableHTML += '</table>';
    
        // Ajouter le tableau dans la page
        this.elBody.innerHTML += tableHTML;
        return this.elBody.innerHTML;
    }
    run(){
        this.elBody.innerHTML = this.render();
    }
}
const bat = new battleship();