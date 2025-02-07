// import the courses data
// let { courses } = require("../data/courses");
const Course = require("../model/course.model");
// import the express-validator package
const { validationResult } = require("express-validator");

// import the httpStatus
const httpStatusText = require("../utils/httpStatusText");

// import the asyncWrrapperapper
const asyncWrrapper = require("../middleware/asyncWrapper");

// inport the handleError
const handleError = require("../utils/appError");

// Get All Courses
const getAllCourses = asyncWrrapper(async (req, res) => {
  // add pagination to the courses
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  // end of pagination

  // get all courses from the database uaing find method
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: courses });
});

// Get Single Course
const GetSingleCourse = asyncWrrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.coursesId);
  if (!course) {
    const errorHandler = handleError(
      404,
      "Course not found",
      httpStatusText.FAIL
    );
    return next(errorHandler);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: course });
});

// Add Course
const AddCourse = asyncWrrapper(async (req, res, next) => {
  const error = validationResult(req);

  // if is not empty return the error eles return the courses
  if (!error.isEmpty()) {
    const errorHandler = handleError(400, error.array(), httpStatusText.FAIL);
    return next(errorHandler);
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json({ status: httpStatusText.SUCCESS, data: newCourse });
});

// Update Course
const updateCourse = asyncWrrapper(async (req, res) => {
  const id = req.params.courseId;

  const updatedCourse = await Course.updateOne(
    { _id: id },
    {
      $set: { ...req.body },
    }
  );

  return res.json({ status: httpStatusText.SUCCESS, data: updatedCourse });
});
// Delete Course
const deleteCourse = asyncWrrapper(async (req, res) => {
  const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  GetSingleCourse,
  AddCourse,
  updateCourse,
  deleteCourse,
};
