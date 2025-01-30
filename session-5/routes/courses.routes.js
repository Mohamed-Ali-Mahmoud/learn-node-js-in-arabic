// import express and express router
const express = require("express");

const router = express.Router();

// import the courses controllers
const coursesControllers = require("../controllers/courses.controllers");

// import the express-validator package
const { body } = require("express-validator");
const validatorSchema = require("../middleware/validatorSchema");

// get all courses
// http://localhost:5000/api/courses
router.get("/api/courses", coursesControllers.getAllCourses);

// get single course
// http://localhost:5000/api/courses/id
router.get("/api/courses/:coursesId", coursesControllers.GetSingleCourse);

// add course
router.post("/api/courses", validatorSchema(), coursesControllers.AddCourse);

// update course
// http://localhost:5000/api/courses/id
router.patch("/api/courses/:courseId", coursesControllers.updateCourse);

// delete course
// http://localhost:5000/api/courses/id
router.delete("/api/courses/:id", coursesControllers.deleteCourse);

module.exports = router;
