<?php
// Configuration de la base de données
$host = 'localhost';
$user = 'root';  // Nom d'utilisateur par défaut de MySQL (modifiable si configuré différemment)
$password = '';  // Mot de passe par défaut de MySQL (modifiable si configuré différemment)
$dbname = 'battleship';

// Connexion à la base de données
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Récupération de l'ID du jeu
$game_id = isset($_GET['game_id']) ? intval($_GET['game_id']) : 1; // ID de la partie (par défaut : 1)

// Requête SQL pour récupérer la grille
$sql = "SELECT row, col, value FROM grids WHERE game_id = $game_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $grid = [];
    while ($row = $result->fetch_assoc()) {
        $grid[] = $row;
    }
    // Renvoi de la grille au format JSON
    echo json_encode($grid);
} else {
    echo json_encode([]);
}

$conn->close();
?>