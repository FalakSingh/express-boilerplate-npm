const { validationResult, check } = require("express-validator");
const { ErrorRes } = require("../utils/reponseHandler");

const validate = (validationRules) => {
  return async (req, res, next) => {
    // Apply validation rules using express-validator
    await Promise.all(
      validationRules.map((validationRule) => validationRule.run(req))
    );

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new ErrorRes(400, errors.array()[0].msg));
    }

    // If validation passes, move to the next middleware or route handler
    next();
  };
};

module.exports = validate;
