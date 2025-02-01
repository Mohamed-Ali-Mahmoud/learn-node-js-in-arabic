// import the express package
const express = require("express");

// import the express-validator package
const { body, withMessage, validationResult } = require("express-validator");

// Initialize the express app
const app = express();

//handel the request body is come from body in the post request
app.use(express.json());

// CRUD => Create - Read - Update - Delete
const coursesRoute = require("./routes/courses.routes");

app.use("/", coursesRoute);

// add port to the server
app.listen(5000, () => console.log("Server is running on port 5000"));
