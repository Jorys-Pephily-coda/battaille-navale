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
    $sql = "INSERT INTO `grid-player1` (`id`, `row-grid`, `column-grid`, `id-type-ship`, `id-ship`) VALUES ";
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
