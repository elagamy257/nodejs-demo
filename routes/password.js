const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordView,
  getResetPasswordView,
  resetThePassword,
} = require("../controllers/passwordController");
const router = express.Router();

// /password/forget-password
router
  .route("/forget-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordView);

// /password/reset-password/:userId/:token
router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword);

module.exports = router;
