const asyncHandler = require("express-async-handler");
const { User, validateChangePassword } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

  const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECERT_KEY;
  const secret = jwtSecret + user.password;
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
    subject: "Reset Password",
    html: `<div>
              <h4>Click on the link below to reset your password:</h4>
              <a href="${link}">Reset Password Link</a>
          </div>`,
  };

  console.log("==========================================");
  console.log("Reset Password Link:", link);
  console.log("==========================================");

  try {
    await transporter.sendMail(mailOptions);
    res.render("link-send");
  } catch (error) {
    console.error("Email send failure:", error.message);
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
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

  const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECERT_KEY;
  const secret = jwtSecret + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
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

  const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECERT_KEY;
  const secret = jwtSecret + user.password;
  try {
    jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    res.render("success-password");
  } catch (error) {
    console.error("Password reset failure:", error.message);
    res.status(400).json({ message: "invalid link or expired token" });
  }
});
