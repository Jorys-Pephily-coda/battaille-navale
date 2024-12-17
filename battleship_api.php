<?php
header('Content-Type: application/json');

// Configuration de la base de données
$host = 'localhost';
$dbname = 'battleship';
$username = 'root';
$password = '';

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Déterminer l'action demandée via la requête HTTP
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    switch ($action) {
        case 'checkCell':
            // Récupérer les paramètres
            $player = isset($_GET['player']) ? $_GET['player'] : 'player1';
            $row = isset($_GET['row']) ? (int)$_GET['row'] : null;
            $col = isset($_GET['col']) ? (int)$_GET['col'] : null;
        
            if ($row === null || $col === null) {
                echo json_encode(['success' => false, 'message' => 'Coordonnées manquantes.']);
                exit;
            }
        
            $table = $player === 'player1' ? 'grid-player1' : 'grid-player2';
        
            // Vérifier si la cellule contient un bateau
            $stmt = $pdo->prepare("SELECT `id-type-ship` FROM `$table` WHERE `row-grid` = :row AND `column-grid` = :col LIMIT 1");
            $stmt->execute([':row' => $row, ':col' => $col]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if ($result) {
                echo json_encode(['success' => true, 'hasShip' => $result['id-type-ship'] > 0]);
            } else {
                echo json_encode(['success' => true, 'hasShip' => false]);
            }
            break;        

            case 'checkWin':
                $player = isset($_GET['player']) ? $_GET['player'] : 'player1';
                $table = $player === 'player1' ? 'grid-player1' : 'grid-player2';
            
                // Vérifier si des bateaux non touchés existent encore
                $stmt = $pdo->query("SELECT COUNT(*) AS remainingShips FROM `$table` WHERE `id-type-ship` > 0");
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode(['totalShipCells' => (int)$result['totalShipCells']]);
                break;            
    
        case 'getGrid':
            // Récupérer la grille d'un joueur (par exemple `player1` ou `player2`)
            $player = isset($_GET['player']) ? $_GET['player'] : 'player1';
            $table = $player === 'player1' ? 'grid-player1' : 'grid-player2';

            $stmt = $pdo->query("SELECT `row-grid` AS row, `column-grid` AS col, `id-type-ship` AS type, `id-ship` AS ship FROM `$table`");
            $grid = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Générer une grille sous forme de tableau 2D
            $formattedGrid = array_fill(0, 10, array_fill(0, 10, 0));
            foreach ($grid as $cell) {
                $formattedGrid[$cell['row']][$cell['col']] = $cell['type'];
            }

            echo json_encode(['success' => true, 'grid' => $formattedGrid]);
            break;

        case 'setGrid':
            // Insérer une nouvelle grille pour un joueur (réinitialisation)
            $player = isset($_POST['player']) ? $_POST['player'] : 'player1';
            $table = $player === 'player1' ? 'grid-player1' : 'grid-player2';

            // Vérifier si une grille est fournie dans la requête POST
            $grid = isset($_POST['grid']) ? json_decode($_POST['grid'], true) : null;
            if (!$grid || !is_array($grid)) {
                echo json_encode(['success' => false, 'message' => 'Grille invalide.']);
                exit;
            }

            // Réinitialiser la table du joueur
            $pdo->exec("DELETE FROM `$table`");

            // Préparer l'insertion des nouvelles données
            $sql = "INSERT INTO `$table` (`row-grid`, `column-grid`, `id-type-ship`, `id-ship`) 
                    VALUES (:row, :col, :idTypeShip, NULL)";
            $stmt = $pdo->prepare($sql);

            // Insérer les données de la grille
            foreach ($grid as $rowIndex => $row) {
                foreach ($row as $colIndex => $value) {
                    $stmt->execute([
                        ':row' => $rowIndex,
                        ':col' => $colIndex,
                        ':idTypeShip' => $value
                    ]);
                }
            }

            echo json_encode(['success' => true, 'message' => 'Grille mise à jour avec succès.']);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Action inconnue.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur : ' . $e->getMessage()]);
}
?>