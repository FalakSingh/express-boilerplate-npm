const { userController } = require("../controllers");
const authorize = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const validations = require("../validations");
const router = require("express").Router();

router
  .route("/register")
  .post(validate(validations.user.auth.register), userController.register);
router
  .route("/login")
  .post(validate(validations.user.auth.login), userController.login);


module.exports = router;
