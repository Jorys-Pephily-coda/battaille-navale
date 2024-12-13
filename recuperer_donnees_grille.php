<?php

try

{

       $bdd = new PDO('mysql:host=localhost;dbname=battleship', 'root', '');

}

catch(Exception $e)

{

        die('Erreur : '.$e->getMessage());

}



$reponse = $bdd->query('SELECT `row-grid`,`column-grid`,`id-type-ship` FROM `grid-player1`');



while ($donnees = $reponse->fetch())

{
       echo $donnees['row-grid'] . $donnees['column-grid']. $donnees['id-type-ship'].  '<br />';
}



$reponse->closeCursor();



?>