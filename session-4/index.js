/*
    Description: 
    A simple HTTP server that listens on port 3000 and 
    serves different pages based on the URL.
*/

// Import the http module
const http = require("http");
// Import the fs module
const fs = require("fs");

// Read the home page and style page
const homePage = fs.readFileSync("./views/index.html", "utf-8");
const stylePage = fs.readFileSync("./views/style.css", "utf-8");

// Create a server object
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(homePage);
    res.end();
  } else if (req.url === "/style.css") {
    res.write(stylePage);
    res.end();
  } else if (req.url === "/about") {
    res.write("<h1>About Us</h1>");
    res.end();
  } else if (req.url === "/contact") {
    res.write("<h1>Contacts Us</h1>");
    res.end();
  } else {
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000/");
});
