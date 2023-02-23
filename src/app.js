// Require
const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');

// URL
const hostname = '127.0.0.1';
const port = 3000;

// Read html file
function readHtml(url, res) {
    /* console.log("-------- URL --------");
    console.log(url);
    console.log("---------------------"); */

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

server = express();
server.use(bodyParser.urlencoded({extended: true}));
server.listen(port, hostname);

// Routes
server.get("/", function(req, res) {
    readHtml("/index.html", res);
});

server.get('/formCible/formulaire.html', function(req, res) {
    readHtml("/formCible/formulaire.html", res);
});

server.post('/formCible/formulaire.html', function(req, res) {
    nom = req.body.nom;
    numb1 = parseInt(req.body.numb1);
    numb2 = parseInt(req.body.numb2);

    titre = "<h1>"+nom+"</h1>";
    calcul = "<p>"+numb1*numb2+"</p>";
    html = "<html><head><title>FormCible</title></head><body>"+titre+calcul+"</body></html>";
    res.send(html);
});