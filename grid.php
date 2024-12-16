<?php
$grid = [
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

try {
    // Connexion à la base de données
    $host = 'localhost';
    $dbname = 'battleship';
    $username = 'root';
    $password = '';
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Supprimer et recréer les tables
    $pdo->exec("
        DROP TABLE IF EXISTS `grid-player1`;
        CREATE TABLE `grid-player1` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `row-grid` INT DEFAULT NULL,
            `column-grid` INT DEFAULT NULL,
            `id-type-ship` INT DEFAULT NULL,
            `id-ship` INT DEFAULT NULL,
            PRIMARY KEY (`id`)
        );

        DROP TABLE IF EXISTS `grid-player2`;
        CREATE TABLE `grid-player2` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `row-grid` INT DEFAULT NULL,
            `column-grid` INT DEFAULT NULL,
            `id-type-ship` INT DEFAULT NULL,
            `id-ship` INT DEFAULT NULL,
            PRIMARY KEY (`id`)
        );
    ");

    // Préparer l'insertion des données dans la table `grid-player1`
    $sql = "INSERT INTO `grid-player1` (`row-grid`, `column-grid`, `id-type-ship`, `id-ship`) 
            VALUES (:row, :col, :idTypeShip, NULL)";
    $stmt = $pdo->prepare($sql);

    // Boucle pour insérer chaque cellule de la grille
    foreach ($grid as $rowIndex => $row) {
        foreach ($row as $colIndex => $value) {
            $stmt->execute([
                ':row' => $rowIndex,
                ':col' => $colIndex,
                ':idTypeShip' => $value
            ]);
        }
    }

    echo "Données insérées avec succès dans la table `grid-player1` !";
} catch (PDOException $e) {
    echo "Erreur de connexion ou d'exécution de la requête : " . $e->getMessage();
}
