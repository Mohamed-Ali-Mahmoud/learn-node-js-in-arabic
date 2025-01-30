const { body } = require("express-validator");

const validatorSchema = () => {
  return [
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
  ];
};

module.exports = validatorSchema;
