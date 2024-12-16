class Battleship {
    constructor(player = 'player1') {
        this.elBody = document.querySelector('body');
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
        this.render();
        this.onClickTds();
    }
}

// Initialisation du jeu pour le joueur 1
const bat = new Battleship('player1');
