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
    $host = 'localhost';
    $dbname = 'battleship';
    $username = 'root';
    $password = '';
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Préparation de la requête
    $sql = "DROP TABLE IF EXISTS `grid-player1`;
    CREATE TABLE IF NOT EXISTS `grid-player1` (
      `id` int NOT NULL AUTO_INCREMENT,
      `row-grid` int DEFAULT NULL,
      `column-grid` int DEFAULT NULL,
      `id-type-ship` int DEFAULT NULL,
      `id-ship` int DEFAULT NULL,
      PRIMARY KEY (`id`)
    );
    
    DROP TABLE IF EXISTS `grid-player2`;
    CREATE TABLE IF NOT EXISTS `grid-player2` (
      `id` int NOT NULL AUTO_INCREMENT,
      `row-grid` int DEFAULT NULL,
      `column-grid` int DEFAULT NULL,
      `id-type-ship` int DEFAULT NULL,
      `id-ship` int DEFAULT NULL,
      PRIMARY KEY (`id`)
    );";
    $sql .= "INSERT INTO `grid-player1` (`id`, `row-grid`, `column-grid`, `id-type-ship`, `id-ship`) VALUES ";
    $values = [];

    for ($i = 0; $i < 10; $i++) {
        $under_grid = $grid[$i];
        for ($j = 0; $j < 10; $j++) {
            $values[] = "(NULL, $i, $j, {$under_grid[$j]}, NULL)";
        }
    }

    // Concaténer les valeurs et éviter la virgule en trop
    $sql .= implode(", ", $values) . ";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo "Données insérées avec succès !";
} catch (PDOException $e) {
    echo "Erreur de connexion ou d'exécution de la requête : " . $e->getMessage();
}
?>
