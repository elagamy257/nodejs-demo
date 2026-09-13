const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("../middlewares/verfiyToken");

/**
 * @desc Upadte user
 * @route put /api/user/:id
 * @method put
 * @access private
 **/
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.username) {
      const userWithSameName = await User.findOne({
        username: req.body.username,
        _id: { $ne: req.params.id },
      });
      if (userWithSameName) {
        return res
          .status(400)
          .json({ message: "this username is already taken" });
      }
    }

    if (req.body.email) {
      const userWithSameEmail = await User.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });
      if (userWithSameEmail) {
        return res.status(400).json({ message: "this email is already taken" });
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    }).select("-password");
    res.status(200).json(updatedUser);
  }),
);

/**
 * @desc Get All Users
 * @route get /api/users
 * @method get
 * @access private (only admin)
 **/
router.get(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password")
    res.status(200).json(users);
  }),
);

module.exports = router;
