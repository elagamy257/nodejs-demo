const asyncHandler = require("express-async-handler");
const { User, validateChangePassword } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const nodemailer = require("nodemailer");

/**
 * @desc Get Forget password view
 * @route GET /password/forget-password
 * @method GET
 * @access Public
 **/
module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forget-password");
});

/**
 * @desc Send Forget password link
 * @route POST /password/forget-password
 * @method POST
 * @access Public
 **/
module.exports.sendForgotPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const secret = process.env.JWT_SECERT_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });

  const link = `http://localhost:5000/password/reset-password/${user.id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "reset password",
    html: `<div>
              <h4>click on the link below to reset your password</h4>
              <a href="${link}">Click here to reset your password</a>
          </div>`,
  };

  console.log("==========================================");
  console.log("Reset Password Link:", link);
  console.log("==========================================");

  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    } else {
      console.log("email sent: " + success.response);
      res.render("link-send");
    }
  });
});

/**
 * @desc Reset password view
 * @route GET /password/reset-password/:userId/:token
 * @method GET
 * @access Public
 **/
module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const secret = process.env.JWT_SECERT_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "invalid link or expired token" });
  }
});

/**
 * @desc Reset the password
 * @route POST /password/reset-password/:userId/:token
 * @method POST
 * @access Public
 **/
module.exports.resetThePassword = asyncHandler(async (req, res) => {
  const { error } = validateChangePassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const secret = process.env.JWT_SECERT_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user.password = req.body.password;
    await user.save();

    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "invalid link or expired token" });
  }
});
