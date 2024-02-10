const { userController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const validations = require("../../validations");
const router = require("express").Router();

router
  .route("/register")
  .post(validate(validations.user.auth.register), userController.auth.register);
router
  .route("/login")
  .post(validate(validations.user.auth.login), userController.auth.login);

module.exports = router;
