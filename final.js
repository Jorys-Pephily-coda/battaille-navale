class Battleship {
    constructor(player = 'player1') {
        this.elBody = document.querySelector('body');
        this.grid = [];
        this.shipId = 0;    //classe bateau
        this.direction = 1; // 1 = horizontal, 0 = vertical
        this.nbrShip = 0;   //nombre bateaux dans grille
        this.isGameOver = false;
        this.player = player; // Identifie le joueur courant ('player1' ou 'player2')
        this.apiUrl = 'http://localhost/battleship_api.php'; // URL de l'API

        this.init();
    }

    async init() {
        try {
            this.run();
        } catch (error) {
            console.error('Erreur lors de l’initialisation :', error);
        }
    }

    renderCreateGrid() {
        let tableHTML = '<table>';
        for (let i = -1; i < 10; i++) {
            tableHTML += "<tr>";
            for (let j = -1; j < 10; j++) {
                if (i === -1 && j === -1) {
                    tableHTML += `<th></th>`;
                } else if (i === -1) {
                    tableHTML += `<th>${j + 1}</th>`;
                } else if (j === -1) {
                    tableHTML += `<th>&#${65 + i}</th>`;
                } else {
                    tableHTML += `<td data-coord="${i}-${j}"></td>`;
                }
            }
            tableHTML += "</tr>";
        }
        tableHTML += '</table>';
        tableHTML += `
            <div class="Divrow">
                <button shipId="5"><img src="./porte_avion.png" width='25%'>Porte-avion (5 cases)</button>
                <button shipId="4"><img src="./croisseur.png" width='25%'>Croiseur (4 cases)</button>
                <button shipId="3"><img src="./sous_marin.png" width='25%'>Sous-marin (3 cases)</button>
                <button shipId="2"><img src="./contre_torpilleur.png" width='25%'>Contre-torpilleur (2 cases)</button>
            </div>
            <button id="rotate">Changer le sens</button>
            <button id="confirm">Valider la grille</button>
        `;
        this.elBody.innerHTML = tableHTML;
    }

    getAdjacent(row, col, direction,shipId) {
        const adjacent = [];
        adjacent.push([row, col]);
        for (let i = 0; i < shipId; i++) {
            if (direction == 0){
                if (( row + shipId <= 10)) {
                    adjacent.push([row + i, col]); // vertical
                } else {
                    return [];
                }
            } else {
                if (col + shipId <= 10){
                    adjacent.push([row, col + i]); // horizontal
                } else {
                    return [];
                }
            }
        }
        return adjacent;
    }

    isValidPlacement(adjacentCoords) {
        return adjacentCoords.every(([row, col]) => {
            const cell = document.querySelector(`td[data-coord="${row}-${col}"]`);
            return cell && !cell.style.backgroundColor; // Cellule libre
        });
    }

    chainShip(row, col, direction, shipId) {
        const adjacentCoords = this.getAdjacent(row, col, direction, shipId);
        if (!this.isValidPlacement(adjacentCoords)) {
            console.log("Placement invalide !");
            return;
        }
        this.nbrShip = this.nbrShip + 1;
        adjacentCoords.forEach(([adjRow, adjCol]) => {
            const cell = document.querySelector(`td[data-coord="${adjRow}-${adjCol}"]`);
            if (cell) {
                cell.style.backgroundColor = 'lime';
                cell.id = `${this.nbrShip}`
                cell.setAttribute('shipId', `${shipId}`);
            }
        });
    }

    onClickTdsCreateGrid() {  //transformer tableau en bouton
        const cells = Array.from(document.querySelectorAll('td'));
        cells.forEach(td => {
            td.addEventListener('click', (event) => this.createGrid(event));
        });
    }

    createGrid(event) { //créer grille
        const td = event.target;
        const coord = td.dataset.coord;
        const [row, col] = coord.split('-').map(Number);

        document.querySelectorAll('button[shipId]').forEach((button) => {
            button.onclick = () => {
                this.shipId = parseInt(button.getAttribute('shipId'));
                alert(`Ship ID sélectionné : ${this.shipId}`);
            };
        });

        document.getElementById('rotate').onclick = () => {
            this.direction = this.direction === 1 ? 0 : 1;
            let phrsDirection = this.direction === 1 ? "Horizontal" : "Vertical";
            alert(`Direction : ${phrsDirection}`);
        };

        if (this.shipId > 0) {  //si l'id du bateau est supérieur a 1
            this.chainShip(row, col, this.direction, this.shipId);
        } else {
            alert("Veuillez sélectionner un bateau !");
        }
        document.getElementById('confirm').onclick = () => {
            const gridArray = [];
            const rows = document.querySelectorAll('table tr');
            
            rows.forEach((row, rowIndex) => {
                if (rowIndex === 0) return; 
                const rowArray = [];
                const cells = row.querySelectorAll('td');
                
                cells.forEach(cell => {
                    // Ajouter l'état de la cellule dans l'array (shipID)
                    let shipId = 0;
                    rowArray.push(cell.attributes.shipId ? shipId = parseInt(cell.getAttribute('shipId'), 10) : 0);        
                });
                gridArray.push(rowArray);
            });
    
            console.log("Grille convertie en tableau JavaScript :", gridArray);
    
            this.grid = gridArray;
            fetch('grid1.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Spécifie que les données sont au format JSON
                },
                body: JSON.stringify({ grid: this.grid }), // Convertit la grille en JSON
            })
            .then(response => {
                if (response.ok) {
                    return response.text(); // Récupérer la réponse en tant que texte
                } else {
                    throw new Error(`Erreur lors de l'envoi : ${response.statusText}`);
                }
            })
            .then(data => {
                console.log('Réponse de grid1.php :', data);
            })
            .catch(error => {
                console.error('Erreur lors de la requête POST :', error);
            });
        };
    }

    async checkCell(row, col) {
        // Appeler l'API pour vérifier si une case contient un bateau
        try {
            const response = await fetch(`${this.apiUrl}?action=checkCell&player=${this.player}&row=${row}&col=${col}`);
            const data = await response.json();

            if (data.success) {
                return data.hasShip; // Retourne true ou false selon la réponse de l'API
            } else {
                console.error('Erreur de l’API lors de la vérification de la case :', data.message);
                return false;
            }
        } catch (error) {
            console.error('Erreur de connexion avec l’API :', error);
            return false;
        }
    }

    render() {
        let tableHTML = '<table>';
        for (let i = -1; i < 10; i++) {
            tableHTML += "<tr>";

            for (let j = -1; j < 10; j++) {
                if (i === -1 && j === -1) {
                    tableHTML += `<th></th>`;
                } else if (i === -1 && j !== -1) {
                    tableHTML += `<th>${j + 1}</th>`;
                } else if (j === -1 && i !== -1) {
                    tableHTML += `<th>&#${65 + i}</th>`;
                } else {
                    tableHTML += `<td data-coord="${i}-${j}" class="grid-cell"></td>`;
                }
            }
            tableHTML += "</tr>";
        }
        tableHTML += '</table>';
        this.elBody.innerHTML = tableHTML;
    }

    onClickTds() {
        const cells = Array.from(document.querySelectorAll('.grid-cell'));
        cells.forEach(td => {
            td.addEventListener('click', this.onClickTd.bind(this));
        });
    }

    async onClickTd(event) {
        const td = event.target;
        const coord = td.dataset.coord;
        const [row, col] = coord.split('-').map(Number);

        if (td.classList.contains('clicked')) return;

        td.classList.add('clicked');

        try {
            const hasShip = await this.checkCell(row, col);

            if (hasShip) {
                td.textContent = "O";
                td.style.backgroundColor = 'red'; // Indique que la case contenait un bateau
            } else {
                td.textContent = "X";
                td.style.backgroundColor = 'blue'; // Indique que la case était vide
            }

            this.checkWin();
        } catch (error) {
            console.error('Erreur lors du clic sur une case :', error);
        }
    }

    async checkWin() {
        // Appeler l'API pour vérifier si tous les bateaux ont été coulés
        try {
            const response = await fetch(`${this.apiUrl}?action=checkWin&player=${this.player}`);
            const data = await response.json();

            if (data.success && data.allSunk) {
                alert("Bravo, vous avez gagné !");
                this.isGameOver = true;
            }
        } catch (error) {
            console.error('Erreur lors de la vérification de la victoire :', error);
        }
    }

    run() {
        this.render.createGrid();
        this.onClickTdsCreateGrid();
        //this.render();
        //this.onClickTds();
    }
}

// Initialisation du jeu pour le joueur 1
const bat = new Battleship('player1');*