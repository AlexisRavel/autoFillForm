function init() {
    let nom = document.getElementById("formNom").value;
    let numb1 = document.getElementById("formNumb1").value;
    let numb2 = document.getElementById("formNumb2").value;
    let data = {
        "Nom": nom,
        "Numb1": numb1,
        "Numb2": numb2
    }

    new AutoFill(data);
}


class AutoFill {
    data

    constructor(data) {
        this.data = data;
        this.main();
    }

    main() {
        console.log(this.data);
        // Aller chercher le formulaire
        // Le remplir et le soumettre
        // Recuperer ce qu'il renvoie
        // Afficher le resultat
    }
}