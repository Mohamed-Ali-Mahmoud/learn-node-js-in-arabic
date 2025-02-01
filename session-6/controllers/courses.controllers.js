// import the courses data
let { courses } = require("../data/courses");

// import the express-validator package
const { validationResult } = require("express-validator");

// Get All Courses
const getAllCourses = (req, res) => {
  res.json(courses);
};

// Get Single Course
const GetSingleCourse = (req, res) => {
  // get id from url paths
  const id = +req.params.coursesId;

  // if the course.id equal id come from url it will return the signle course
  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) {
    res.status(404).json({ msg: "course not found!" });
  }
  res.json(course);
};

// Add Course
const AddCourse = (req, res) => {
  const error = validationResult(req);

  // if is not empty return the error eles return the courses
  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }

  console.log(error);

  //
  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);

  res.status(201).json(courses); // a resource was created successfully
};

// Update Course
const updateCourse = (req, res) => {
  const id = +req.params.courseId;

  let course = courses.find((course) => course.id === id);

  if (!course) {
    res.status(400).json({ msg: "course not found!" });
  }
  // updtae the course
  course = { ...course, ...req.body };

  res.status(200).json(course);
};

// Delete Course
const deleteCourse = (req, res) => {
  const id = +req.params.id;

  courses = courses.filter((course) => course.id !== id);

  res.status(200).json({ msg: "the course was deleted successfully" });
};

module.exports = {
  getAllCourses,
  GetSingleCourse,
  AddCourse,
  updateCourse,
  deleteCourse,
};
