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

module.exports = { generateOtp, roundoff, generateuuid };
