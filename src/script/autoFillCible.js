// -------- VAR --------
// Require
const puppeteer = require('puppeteer');

// -------- MAIN FUNCTIONS --------
// To launch the entire script
const init = (data) => {
    new AutoFill(data);
}

// -------- CLASS --------
// All properties, data and main functions for the autoFill functionality
class AutoFill {
    data    // Input data
    browser = null;
    page = null;
    elements = [];  // All elements we want to get

    constructor(data) {
        this.data = data;
        this.searchPage('http://localhost/formulaire.php');
    }

    // Take the URL wants, puppeteer go on it
    async searchPage(url) {
        // Init puppeteer
        const browser = await puppeteer.launch({
            headless: true
        });
        this.browser = browser;
        const page = await browser.newPage();

        // Go on website and keep it
        await page.goto(url);
        this.page = page;

        // Fill form on the website
        await this.fillForm();
    }

    async fillForm() {
        // Fill and submt form
        await this.page.type('#formNom', this.data["Nom"]);
        await this.page.type('#formNumb1', this.data["Numb1"]);
        await this.page.type('#formNumb2', this.data["Numb2"]);
        await this.page.evaluate(() => {
            document.querySelector('input[value=Envoyer]').click();
        });

        // Get data that we search for
        await this.getElement('.titreNom');
        await this.getElement('.calcul');
        console.log(this.elements);
        
        // Close website for puppeteer
        await this.browser.close();
    }

    // Get element wanted
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