const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {User,validateRegisterUser, validateLoginUser, validateUpdateUser} = require("../models/User");
const bcrypt = require("bcryptjs")

/** 
* @desc Register new user
* @route post /api/auth/register
* @method post
* @access Public
**/

router.post("/register", asyncHandler(async(req,res)=>{
  const {error} = validateRegisterUser(req.body);
  if(error) {
    return res.status(400).json({message : error.details[0].message})
  }
  let user =await User.findOne({email: req.body.email})
  if(user){
    return res.status(400).json({message : "this user already registred"})
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  user = new User ({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    isAdmin: req.body.isAdmin,
  })

  const result = await user.save();
  const token = null;
  const {password, ...other} =result._doc;
  res.status(201).json(result)

}))

module.exports = router;