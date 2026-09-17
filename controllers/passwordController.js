const { render } = require("ejs");
const asyncHandler = require("express-async-handler");

/** 
* @desc Get Forget password view
* @route GET /password/forget-password
* @method GET
* @access Public
**/

module.exports.getForgotPasswordView = asyncHandler ((req,res) =>{
  res.render("forget-password")
})