// import the courses data
// let { courses } = require("../data/courses");
const Course = require("../model/course.model");
// import the express-validator package
const { validationResult } = require("express-validator");

// Get All Courses
const getAllCourses = async (req, res) => {
  // res.json(courses);
  // get all courses from the database uaing find method
  const courses = await Course.find();
  res.json(courses);
};

// Get Single Course
const GetSingleCourse = async (req, res) => {
  // // get id from url paths
  // const id = +req.params.coursesId;

  // // if the course.id equal id come from url it will return the signle course
  // const course = courses.find((course) => course.id === parseInt(id));

  // if (!course) {
  //   res.status(404).json({ msg: "course not found!" });
  // }
  // res.json(course);

  try {
    const course = await Course.findById(req.params.coursesId);
    if (!course) {
      res.status(404).json({ msg: "course not found!" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ msg: "invalid object id" });
  }
};

// Add Course
const AddCourse = async (req, res) => {
  const error = validationResult(req);

  // if is not empty return the error eles return the courses
  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }

  // console.log(error);

  // //
  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);

  // res.status(201).json(courses); // a resource was created successfully

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

// Update Course
const updateCourse = async (req, res) => {
  // const id = +req.params.courseId;

  // let course = courses.find((course) => course.id === id);

  // if (!course) {
  //   res.status(400).json({ msg: "course not found!" });
  // }
  // // updtae the course
  // course = { ...course, ...req.body };

  // res.status(200).json(course);

  try {
    const id = req.params.courseId;

    const updatedCourse = await Course.updateOne(
      { _id: id },
      {
        $set: { ...req.body },
      }
    );

    return res.status(200).json(updatedCourse);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
// Delete Course
const deleteCourse = async (req, res) => {
  // const id = +req.params.id;

  // courses = courses.filter((course) => course.id !== id);

  // res.status(200).json({ msg: "the course was deleted successfully" });

  const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json(deletedCourse);
};

module.exports = {
  getAllCourses,
  GetSingleCourse,
  AddCourse,
  updateCourse,
  deleteCourse,
};
