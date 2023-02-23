// Setup url and index
const http = require('http');
const fs = require('fs').promises;

const hostname = '127.0.0.1';
const port = 3000;

// Start server
const server = http.createServer((req, res) => {
    // Gerer favicon request
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        return;
      }

    url = "/index.html";
    if(req != null && req.url != "/") {
        url = req.url;
    }
    readHtml(url, res);
});

// Reac file
function readHtml(url, res) {
    console.log("-------- URL --------");
    console.log(url);
    console.log("---------------------");
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

server.listen(port, hostname);