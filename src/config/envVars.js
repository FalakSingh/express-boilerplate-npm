const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname + `../../../env/.env.${process.env.NODE_ENV}`),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES,
};
