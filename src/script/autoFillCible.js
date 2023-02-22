const puppeteer = require('puppeteer');

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
    page = null;

    constructor(data) {
        this.data = data;
        this.main();
    }

    main() {
        console.log(this.data);
        // Aller chercher le formulaire
        this.searchFormCible();
        // Le remplir et le soumettre
        this.fillFormCible();
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
        await page.goto('http://localhost/formCible/form.php');
        this.page = page;
    }

    async fillFormCible() {
        // Remplir et spumettre le formulaire
        await this.page.type('#formNom', 'Kakapo');
        await this.page.type('#formMail', 'LeBoss');
        await this.page.evaluate(() => {
            document.querySelector('input[value=Envoyer]').click();
        });
    }
}