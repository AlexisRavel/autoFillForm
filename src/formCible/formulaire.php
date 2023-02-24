<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire cible</title>
</head>
<body>
    <?php
        if(isset($_POST["nom"]) && isset($_POST["numb1"]) && isset($_POST["numb2"])
        || !empty($_POST["nom"]) && !empty($_POST["numb1"]) && !empty($_POST["numb2"])) {
    ?>

    <h1 class="titreNom"><?= $_POST["nom"] ?></h1>
    <p class="calcul"><?= $_POST["numb1"] * $_POST["numb2"] ?></p>

    <?php
        } else {
    ?>

    <form action="<?= $_SERVER["PHP_SELF"] ?>" method="post">
        <label for="nom">Nom: </label>
        <input type="text" name="nom" id="formNom" required>

        <label for="numb1">Chiffre 1: </label>
        <input type="number" name="numb1" id="formNumb1" required>

        <label for="numb2">Chiffre 2: </label>
        <input type="number" name="numb2" id="formNumb2" required>

        <input type="submit" value="Envoyer">
    </form>

    <?php
        }
    ?>
</body>
</html>