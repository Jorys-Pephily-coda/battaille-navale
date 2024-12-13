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
$pdo = new PDO ("mysql:host=$host; dbname=$dbname", $username, $password);
$json = json_encode($grid);
$sql = "";
for($i = 0;$i < 10;$i += 1){
    for($j = 0;$j < 10; $j += 1){
        $k = $i + $j;
        $sql += "INSERT INTO grid-player1 (row-grid, column-grid, id-type-ship) VALUES ($i, $j , $json[$k]);";
    }
}

$stmt = $pdo->prepare($sql);
$stmt->execute();

}
catch (PDOException $e) {
    echo "Erreur de connexion ou d'execution de la requête : " . $e->getMessage();
}
?>
