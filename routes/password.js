const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordView,
  getResetPasswordView,
  resetThePassword,
} = require("../controllers/passwordController");
const router = express.Router();

/**
 * @swagger
 * /password/forget-password:
 *   get:
 *     summary: Render forgot password HTML view
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: Forgot password EJS view
 *   post:
 *     summary: Send password reset email link
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent to email
 *       404:
 *         description: User with given email not found
 *
 * /password/reset-password/{userId}/{token}:
 *   get:
 *     summary: Render reset password HTML view
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     responses:
 *       200:
 *         description: Reset password EJS view
 *       400:
 *         description: Invalid link or expired token
 *   post:
 *     summary: Submit new password
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewStrongPassword123!
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewStrongPassword123!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid link, expired token, or weak password
 */

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
