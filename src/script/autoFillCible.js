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
    browser = null;
    page = null;

    constructor(data) {
        this.data = data;
        this.searchPage('http://localhost/formulaire.php');
    }

    async searchPage(url) {
        // Init de puppeteer
        const browser = await puppeteer.launch({
            headless: true
        });
        this.browser = browser;
        const page = await browser.newPage();

        // Aller sur la page
        await page.goto(url);
        this.page = page;

        // Remplir le formulaire correspondant
        this.fillForm();
    }

    async fillForm() {
        // Remplir et spumettre le formulaire
        await this.page.type('#formNom', this.data["Nom"]);
        await this.page.type('#formNumb1', this.data["Numb1"]);
        await this.page.type('#formNumb2', this.data["Numb2"]);
        await this.page.evaluate(() => {
            document.querySelector('input[value=Envoyer]').click();
        });

        // Recup les données
        this.getElement('.titreNom');
        this.getElement('.calcul');
        
        await this.browser.close();
    }

    async getElement(resultsSelector) {
        await this.page.waitForSelector(resultsSelector);
        let element = await this.page.$(resultsSelector);
        let value = await this.page.evaluate(el => el.textContent, element).toString();
        console.log(value);
    }
}

// Export
module.exports = {
    init,
}