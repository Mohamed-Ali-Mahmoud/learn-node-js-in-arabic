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

// // add course
// app.post(
//   "/api/courses",

//   body("name").notEmpty().withMessage("title is required").isLength({ min: 2 }),
//   body("price").isNumeric().withMessage("price must be a numeric value"),
//   (req, res) => {
//     console.log(req.body); // get the body from the request

//     // check if the title and price is exist in the request body
//     // instead of this we can use express-validator package to validate the request body
//     //   if (!req.body.title) {
//     //     return res.status(400).json({ msg: "Please include a course title" });
//     //   }

//     //   if (!req.body.price) {
//     //     return res.status(400).json({ msg: "Please include a course price" });
//     //   }

//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(400).json(error.array());
//     }
//     console.log(error);
//     courses.push({
//       id: courses.length + 1, // get the last id and add 1 to it
//       ...req.body, // get the body from the request
//     });
//     res.status(201).json(courses); // return the courses array and status 201 => a new resource was created successfully
//   }
// );

// add course
app.post(
  "/api/courses",

  [
    body("name") // التحقق من الحقل name
      .notEmpty() // التحقق من أن الحقل ليس فارغاً
      .withMessage("title is required") // رسالة الخطأ إذا كان الحقل فارغاً
      .isLength({ min: 2 }) // الحد الأدنى لطول النص
      .withMessage("title must be at least 2 characters"), // رسالة الخطأ إذا كان الحقل أقل من 2 حرف

    body("price") // التحقق من الحقل price
      .notEmpty() // التحقق من أن الحقل ليس فارغاً
      .withMessage("price is required") // رسالة الخطأ إذا كان الحقل فارغاً
      .isNumeric() // التحقق من أن القيمة رقمية
      .withMessage("price must be a numeric value"), // رسالة الخطأ إذا كانت القيمة ليست رقمية
  ],
  (req, res) => {
    // التحقق من الأخطاء
    const error = validationResult(req);

    // bad request <= إذا كانت الأخطاء غير فارغة يتم إرجاع الأخطاء مع حالة 400

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }

    console.log(error); // إظهار الأخطاء في الكونسول

    //
    const course = { id: courses.length + 1, ...req.body }; // إنشاء كورس جديد بالبيانات المدخلة من الفورم وإضافة ال id بزيادة 1 عن آخر id
    courses.push(course); // إضافة الكورس الجديد إلى الكورسات

    res.status(201).json(courses); // إرجاع الكورسات بعد إضافة الكورس الجديد مع حالة 201 => تم إنشاء الكورس بنجاح
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
  //
  course = { ...course, ...req.body };

  //   const course = {
  //     id: 1,
  //     name: "JavaScript Basics",
  //     price: 100,
  //   };

  //   const reqBody = {
  //     name: "Advanced JavaScript",
  //     price: 150,
  //   };

  //   const updatedCourse = { ...course, ...reqBody };
  //   console.log(updatedCourse);

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
