const mongoose = require("mongoose");

const generateOtp = (len = 4) => {
  let multiplier = 10 ** (len - 1);
  return Math.floor(9 * multiplier * Math.random() + 1000);
};

const roundoff = (num) => {
  Math.round(num * 100) / 100;
};

const generateuuid = () => {
  return require("crypto").randomUUID();
};

const deletePassword = (givenObject) => {
  const jsObj =
    givenObject instanceof mongoose.Model
      ? givenObject.toObject()
      : givenObject;
  delete jsObj.password;
  return jsObj;
};



module.exports = { generateOtp, roundoff, generateuuid, deletePassword };
