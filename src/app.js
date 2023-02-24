// Import
const autoFill = require('./script/autoFillCible')

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

server.get('/form.html', function(req, res) {
    readHtml("/form.html", res);
});

server.post('/form.html', function(req, res) {
    readHtml("/form.html", res);
    let data = {
        "Nom": req.body.nom,
        "Numb1": req.body.numb1,
        "Numb2": req.body.numb2
    }
    autoFill.init(data);
});