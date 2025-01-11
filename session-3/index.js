const fs = require("fs");

console.log("1");

fs.readFile("./text.txt", "utf-8", (err, contnet) => {
  if (err) {
    console.log(err);
  }

  console.log(contnet);
});

console.log("2");

//1
// 2
// file content

// Asynchronous - Non Blocking Code

// const { pbkdf2 } = require("node:crypto");

const start = performance.now();

// pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });
// pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// fetch("https://jsonplaceholder.typicode.com/todos/").then(() => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// fetch("https://jsonplaceholder.typicode.com/todos/").then(() => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// fetch("https://jsonplaceholder.typicode.com/todos/").then(() => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// fetch("https://jsonplaceholder.typicode.com/todos/").then(() => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// fetch("https://jsonplaceholder.typicode.com/todos/").then(() => {
//   console.log("End of Perfromance ms ", performance.now() - start);
// });

// Create HTTP Server
// import http from "http";
const http = require("http");

// create a port for the server
const PORT = 3001;

// createt the server
const server = http.createServer((req, res) => {
  // make a route to home page
  if (req.url === "/") {
    res.end("Home Page");
    // make a route to about page
  } else if (req.url === "/about") {
    res.end("About Page");
  } else {
    // make a route to not found page
    res.end("Not Found Page");
  }
});

// listen to the server
server.listen(PORT, () => {
  console.log(`${`You are Listen to port ${PORT}`}`);
});
