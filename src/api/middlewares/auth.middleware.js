const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config/envVars");
const { ErrorRes } = require("../utils/reponseHandler");
const User = require("../models/User.model");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, function (err, decoded) {
      if (!err) resolve(decoded);
      else {
        reject({ message: "Invalid Token" });
      }
    });
  });
};

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // throw an error if token is missing
    if(!token) throw new Error("Unauthorized")

    const decoded = await verifyToken(token);

    const user = await User.findOne({ _id: decoded._id, status: true });

    //throw an error if user doesn't exists
    if (!user) {
      throw new Error("Invalid Token");
    }

    req.user = user;
    next();
    
  } catch (error) {
    next(new ErrorRes(401, error.message));
  }
};

module.exports = authorize;
