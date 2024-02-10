const { Schema, model } = require("mongoose");
var bcrypt = require("bcryptjs");
const { jwt_secret, jwt_expires } = require("../../config/envVars");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    full_name: String,
    email: { type: String, required: true },
    password: { type: String, select: false },
    // true for active... false for deleted
    status: { type: Boolean, default: true, enum: [true, false] },
    otp: { type: Number, select: false },
    // false for not verified... true for verified
    otp_verified: { type: Boolean, default: false, enum: [true, false] },
    lastlogin: Date,
  },
  { timestamps: true }
);

// checks if the password is modified if it is then it is hashed before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generates a random 4 digit OTP
userSchema.methods.generateOtp = async function () {
  const otp = Math.floor(Math.random() * 9000) + 1000;
  this.otp = otp;
  await this.save();
  return otp;
};

// verifies otp and set the field to undefined
userSchema.methods.verifyOtp = function (givenotp) {
  if (this.otp === givenotp) {
    this.otp_verified = true;
    this.otp = undefined;
    return true;
  } else {
    return false;
  }
};

// checks if the password given matches with the one in DB
userSchema.methods.checkPass = async function (givenPass) {
  return await bcrypt.compare(givenPass, this.password);
};

// updates lastlogin
userSchema.methods.updateLogin = async function () {
  this.lastlogin = Date.now();
  await this.save();
};

//generates a jwt token with id
userSchema.methods.getJwt = function () {
  return jwt.sign({ _id: this._id }, jwt_secret, {
    expiresIn: jwt_expires,
  });
};

const User = model("User", userSchema, "users");

module.exports = User;
