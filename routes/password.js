const express = require("express");
const {getForgotPasswordView} = require("../controllers/passwordController")
const router = express.Router();

// /password/forget-password
 router.route("/forget-password").get(getForgotPasswordView)


module.exports = router;