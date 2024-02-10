const { messages } = require("../../constants/api.constants");
const User = require("../../models/users");
const { ErrorRes } = require("../../utils/reponseHandler");

const findwithEmail = async (email) => {
  const user = await User.findOne({ email, status: true }).select("+password");
  return user;
};

const registerUser = async (data) => {
  try {
    const { email, full_name, password } = data;

    const userExists = await findwithEmail(email);

    if (userExists) {
      throw new ErrorRes(400, messages.emailExists);
    }
    const user = await User.create({ email, full_name, password });
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (data) => {
  const { email, password } = data;

  const userExists = await findwithEmail(email);

  if (!userExists) {
    throw new ErrorRes(400, messages.invalid_credentials);
  }
  const user = userExists;

  if (!user.otp_verified) {
    throw new ErrorRes(400, messages.otp_not_verified);
  }
  console.log(email, password);

  const isMatch = await user.checkPass(password);

  if (!isMatch) {
    throw new ErrorRes(400, messages.invalid_credentials);
  }

  const token = user.getJwt();
  const responseUser = user.toObject();
  responseUser.token = token;

  return responseUser;
};

module.exports = { findwithEmail, registerUser, login };
