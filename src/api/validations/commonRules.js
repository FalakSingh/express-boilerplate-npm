const { body } = require("express-validator");

const email = body("email")
  .exists()
  .withMessage("Email field is missing")
  .trim()
  .isEmail()
  .withMessage("Invalid Email")
  .normalizeEmail();

const password = body("password")
  .exists()
  .withMessage("Password field is missing")
  .isString()
  .withMessage("Password must be a string")
  .isLength({ min: 6 })
  .withMessage("Password must be 8 characters long");

module.exports = { email, password };
