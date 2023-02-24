// -------- VAR --------
// Import
const autoFill = require('./script/autoFillCible')

// Require
const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');

// URL var
const hostname = '127.0.0.1';
const port = 3000;

// -------- MAIN FUNCTIONS --------
// Read html file
function readHtml(url, res) {
    /* console.log("-------- URL --------");
    console.log(url);
    console.log("---------------------"); */

    // Get the html file
    fs.readFile(__dirname + url)
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        })
}

function buildHtml(nom, number) {
    head = '<meta charset="UTF-8">'
        + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
        + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        + '<title>AutoFillForm</title>';
    
    body = '<h1>' + nom + '</h1>'
        + '<p>' + number + '</p>'
        + '<a href="form.html">Retour</a>';
    
    html = '<!DOCTYPE html>'
        + '<html><head>' + head + '</head>'
        + '<body>' + body + '</body></html>';
    
    return html;
}

// Server functions
server = express();
server.use(bodyParser.urlencoded({extended: true}));    // To get post var
server.listen(port, hostname);

// -------- ROUTES --------
// Index
server.get("/", function(req, res) {
    readHtml("/index.html", res);
});

// When go on the form (GET)
server.get('/form.html', function(req, res) {
    readHtml("/form.html", res);
});

// When submit the form (POST)
server.post('/form.html', async function(req, res) {
    // Get POST var
    let data = {
        "Nom": req.body.nom,
        "Numb1": req.body.numb1,
        "Numb2": req.body.numb2
    }
    elements = await autoFill.init(data);

    // Show html pahe with elements that we get
    var html = buildHtml(elements[0], elements[1]);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': html.length,
    });
    res.end(html);
});

