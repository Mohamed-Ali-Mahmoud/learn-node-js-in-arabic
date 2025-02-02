// import the courses data
// let { courses } = require("../data/courses");
const Course = require("../model/course.model");
// import the express-validator package
const { validationResult } = require("express-validator");

// import the httpStatus
const httpStatusText = require("../utils/httpStatusText");
// Get All Courses
const getAllCourses = async (req, res) => {
  // res.json(courses);

  // add pagination to the courses
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  // end of pagination

  // get all courses from the database uaing find method

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: courses });
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
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "course not found!" },
      });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: course });
  } catch (err) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
    });
  }
};

// Add Course
const AddCourse = async (req, res) => {
  const error = validationResult(req);

  // if is not empty return the error eles return the courses
  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.Fail, data: error.array() });
  }

  // console.log(error);

  // //
  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);

  // res.status(201).json(courses); // a resource was created successfully

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: newCourse });
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

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: updatedCourse });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};
// Delete Course
const deleteCourse = async (req, res) => {
  // const id = +req.params.id;

  // courses = courses.filter((course) => course.id !== id);

  // res.status(200).json({ msg: "the course was deleted successfully" });

  const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  GetSingleCourse,
  AddCourse,
  updateCourse,
  deleteCourse,
};
