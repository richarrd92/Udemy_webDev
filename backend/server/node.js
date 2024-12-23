// Simple server using nodeJS framework

const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Node server: Hello world from main page");
  } else if (req.url === "/other") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Node server: Hello world from other page");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Node server: 404 Not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is listening at http://${hostname}:${port}`);
});
