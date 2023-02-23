const puppeteer = require('puppeteer');

const init = () => {
    /* let nom = document.getElementById("formNom").value;
    let numb1 = document.getElementById("formNumb1").value;
    let numb2 = document.getElementById("formNumb2").value; */
    let nom = "Kakapo";
    let numb1 = "8";
    let numb2 = "2";
    let data = {
        "Nom": nom,
        "Numb1": numb1,
        "Numb2": numb2
    }

    new AutoFill(data);
}


class AutoFill {
    data
    page = null;

    constructor(data) {
        this.data = data;
        this.main();
    }

    main() {
        console.log(this.data);
        // Aller chercher le formulaire
        // Le remplir et le soumettre
        this.searchFormCible();
        //this.fillFormCible();
        // Recuperer ce qu'il renvoie
        // Afficher le resultat
    }

    async searchFormCible() {
        // Init de puppeteer
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();

        // Aller sur la page
        await page.goto('http://localhost/formulaire.php');
        this.page = page;

        // Remplir le formulaire correspondant
        this.fillFormCible();
    }

    async fillFormCible() {
        // Remplir et spumettre le formulaire
        await this.page.type('#formNom', this.data["Nom"]);
        await this.page.type('#formNumb1', this.data["Numb1"]);
        await this.page.type('#formNumb2', this.data["Numb2"]);
        await this.page.evaluate(() => {
            document.querySelector('input[value=Envoyer]').click();
        });
    }
}

// Export
module.exports = {
    init,
}