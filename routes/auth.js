const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc Register new user
 * @route post /api/auth/register
 * @method post
 * @access Public
 **/

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "this user already registred" });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });

    const result = await user.save();
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECERT_KEY,
    );
    const { password, ...other } = result._doc;
    res.status(201).json({ ...other, token });
  }),
);

/**
 * @desc login new user
 * @route post /api/auth/login
 * @method post
 * @access Public
 **/

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECERT_KEY,
    );
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });
  }),
);

module.exports = router;
