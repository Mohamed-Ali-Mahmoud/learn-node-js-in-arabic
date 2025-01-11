const express = require("express");

const app = express();

// handle requests for static files like images, CSS, and JavaScript
// handle this for root path (/) ⬇
// app.use(express.static("./views"));

// function logger(req) {
//   console.log("Method:", req.method, "URL:", req.url);
// }

//middleware function

app.use((req, res, next) => {
  console.log("Method:", req.method, "URL:", req.url);
  next(); // call the next middleware function
});

// specifyed middleware function for specific path

app.use("/about", (req, res, next) => {
  console.log("About page middleware");
  next();
});

// this is a root path (/) handler
app.get("/", (req, res) => {
  //   logger(req);
  res.send("Hello World");
});

// this is a About path (/about) handler
app.get("/about", (req, res) => {
  //   logger(req);
  res.send("About Page");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
