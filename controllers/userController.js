const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");

/**
 * @desc Update user
 * @route PUT /api/users/:id
 * @method PUT
 * @access Private (Only user himself or Admin)
 **/
const updateUser = asyncHandler(async (req, res) => {
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
    new: true,
  }).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json(updatedUser);
});

/**
 * @desc Get All Users
 * @route GET /api/users
 * @method GET
 * @access Private (Only Admin)
 **/
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 * @desc Get User by id
 * @route GET /api/users/:id
 * @method GET
 * @access Private (Only Admin & user himself)
 **/
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 * @desc Delete User by id
 * @route DELETE /api/users/:id
 * @method DELETE
 * @access Private (Only Admin & user himself)
 **/
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
