const puppeteer = require('puppeteer');
//const document = new Document

const init = (data) => {
    new AutoFill(data);
}


class AutoFill {
    data
    browser = null;
    page = null;
    elements = [];

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
        await this.fillForm();
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
        await this.getElement('.titreNom');
        await this.getElement('.calcul');
        console.log(this.elements);
        
        await this.browser.close();
    }

    async getElement(resultsSelector) {
        await this.page.waitForSelector(resultsSelector);
        let element = await this.page.$(resultsSelector);
        let value = await this.page.evaluate(el => el.textContent, element);
        this.elements.push(value);
    }
}

// Export
module.exports = {
    init,
}