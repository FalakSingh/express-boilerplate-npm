const { messages } = require("../constants/api.constants");
const User = require("../models/User.model");
const { ErrorRes } = require("../utils/reponseHandler");
const { generateOtp, deletePassword } = require("../utils/utility");

const findwithEmail = async (email) => {
  const user = await User.findOne({ email, status: true }).select("+password");
  return user;
};

const create = async (data) => {
  try {
    const { email, full_name, password } = data;

    // If user already exists with the same email
    const userExists = await findwithEmail(email);

    if (userExists) {
      throw new ErrorRes(400, messages.emailExists);
    }

    const user = await User.create({
      email,
      full_name,
      password,
      otp: generateOtp(4),
    });

    return user;

  } catch (error) {
    throw error;
  }
};

const login = async (data) => {

  const { email, password } = data;

  //If user exists with given email
  const userExists = await findwithEmail(email);

  //Throw error if user doesn't exist
  if (!userExists) {
    throw new ErrorRes(400, messages.invalid_credentials);
  }

  const user = userExists;

  //Throw error is otp is not verified
  // if (!user.otp_verified) {
  //   throw new ErrorRes(400, messages.otp_not_verified);
  // }

  //Match password with schema method
  const isMatch = await user.checkPass(password);

  if (!isMatch) {
    throw new ErrorRes(400, messages.invalid_credentials);
  }

  const token = user.getJwt();
  const responseUser = user.toObject();
  responseUser.token = token;

  // Return user data with token
  return deletePassword(responseUser);
};

module.exports = { findwithEmail, create, login };
