const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

//user schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Generate Token
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECERT_KEY,
  );
};

//user model
const User = mongoose.model("user", UserSchema);

//valid functions
function validateRegisterUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    username: joi.string().trim().min(3).max(100).required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}
function validateChangePassword(obj) {
  const schema = joi.object({
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}
function validateUpdateUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).email(),
    username: joi.string().trim().min(3).max(100),
    password: joi.string().trim().min(8),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateChangePassword,
};
