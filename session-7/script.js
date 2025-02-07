// import the express package
const express = require("express");

// import the express-validator package
const { body, withMessage, validationResult } = require("express-validator");

// Initialize the express app
const app = express();

//handel the request body is come from body in the post request
app.use(express.json());

// import mongoose package
const mongoose = require("mongoose");

// initialize the dotenv package
require("dotenv").config();

// import the httpStatus
const httpStatusText = require("./utils/httpStatusText");

const url = process.env.MONGODB_URL;

mongoose.connect(url).then(() => {
  console.log("mongodb server is connected");
});

// CRUD => Create - Read - Update - Delete
const coursesRoute = require("./routes/courses.routes");

app.use("/", coursesRoute);

// if the user enter route did not exist in the server it will return this message
app.all("*", (req, res) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resourse not availabile!",
  });
});

// global error handler
// if the route is exist but the user enter wrong data it will return this message
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
  });
});

// add port to the server
app.listen(5000, () => console.log("Server is running on port 5000"));
