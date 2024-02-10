const { body} = require("express-validator");
const commonRules = require("../commonRules");

// Validation middleware for the /register route
const register = [
  body("full_name").notEmpty().withMessage("Full name is required").isString(),
  commonRules.email,
  commonRules.password,
];

const login = [commonRules.email, commonRules.password];

module.exports = { register, login };
