<?php
    // Paramètres de connexion à la base de données
    $host = 'localhost';
    $dbname = 'battleship';
    $username = 'joueur_battleship';
    $password = 'naval';
    try {
        // Création de la connexion PDO
        $pdo = new PDO ("mysql:host=$host; dbname=$dbname", $username, $password);

        // Définir le mode d'erreur pour lancer les exceptions $pdo->setAttribute (PDO::ATTR_ERRMODE, PDO:: ERRMODE_EXCEPTION);
        
        // Exemple de données à insérer
        
        $username = 'john_doe';
        
        $email = 'johndoe@example.com';
        
        // Préparer la requête SQL avec des placeholders
        
        $sql = "INSERT INTO users (username, email) VALUES (:username, email)";
        $stmt = $pdo->prepare($sql);
        // Lier les paramètres à la requête
    
        $stmt->bindParam('username', $username, PDO:: PARAM_STR);
        $stmt->bindParam(':email', $email, PDO:: PARAM_STR);
        // Exécuter la requête
    
        $stmt->execute();
    
        echo "Utilisateur ajouté avec succès.";
    
    
    } catch (PDOException $e) {
        echo "Erreur de connexion ou d'execution de la requête : " . $e->getMessage();
    }
?>