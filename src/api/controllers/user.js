const { messages } = require("../constants/api.constants");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { successRes } = require("../utils/reponseHandler");

const register = catchAsync(async (req, res, next) => {
  const user = await userService.create(req.body);
  return successRes(res, 200, messages.user_register, user);
});

const login = catchAsync(async (req, res, next) => {
  const user = await userService.login(req.body);
  return successRes(res, 200, messages.logged_in, user);
});

module.exports = { register, login };
