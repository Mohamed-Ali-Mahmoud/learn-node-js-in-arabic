// import the express package
const express = require("express");

// import the express-validator package
const { body, withMessage, validationResult } = require("express-validator");

// Initialize the express app
const app = express();

//handel the request body is come from body in the post request
app.use(express.json());

// CRUD => Create - Read - Update - Delete

// aray of courses
let courses = [
  { id: 1, name: "reactjs course", price: 1000 },
  { id: 2, name: "angularjs course", price: 2000 },
  { id: 3, name: "javascript course", price: 900 },
  { id: 4, name: "tailwind course", price: 500 },
  { id: 5, name: "php course", price: 1000 },
  { id: 6, name: "c++ course", price: 3000 },
  { id: 7, name: "c# course", price: 1500 },
  { id: 8, name: "go course", price: 2000 },
  { id: 9, name: "node course", price: 3000 },
  { id: 10, name: "nextjs", price: 5000 },
];

// get all courses
// http://localhost:5000/api/courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// get single course
// http://localhost:5000/api/courses/id
app.get("/api/courses/:coursesId", (req, res) => {
  // get id from url paths
  const id = +req.params.coursesId;

  // if the course.id equal id come from url it will return the signle course
  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) {
    res.status(404).json({ msg: "course not found!" });
  }
  res.json(course);
});

// add course
app.post(
  "/api/courses",

  [
    body("name")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title must be at least 2 characters"),

    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be a numeric value"),
  ],
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }

    console.log(error);

    //
    const course = { id: courses.length + 1, ...req.body };
    courses.push(course);

    res.status(201).json(courses);
  }
);

// update course
// http://localhost:5000/api/courses/id
app.patch("/api/courses/:courseId", (req, res) => {
  const id = +req.params.courseId;
  let course = courses.find((course) => course.id === id);

  if (!course) {
    res.status(400).json({ msg: "course not found!" });
  }
  // update the course
  course = { ...course, ...req.body };

  res.status(200).json(course);
});

// delete course
// http://localhost:5000/api/courses/id
app.delete("/api/courses/:id", (req, res) => {
  const id = +req.params.id;

  courses = courses.filter((course) => course.id !== id);

  res.status(200).json({ msg: "the course was deleted successfully" });
});
// add port to the server
app.listen(5000, () => console.log("Server is running on port 5000"));
