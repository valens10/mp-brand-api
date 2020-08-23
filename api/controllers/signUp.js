'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('Users');
const validationSchema = require("../validation/validationSchema")

const bcrypt = require('bcrypt');

exports.signUp = async function (req, res) {
  try {
    const params = await validationSchema.userSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: params.email})
    if (doesExist)
      res.send("User with this email is exist");
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(params.password, salt);
    
    const user = { full_name: params.full_name, email: params.email, status: params.status, password: hashedPassword };
    const new_user = new User(user);
    const savedUser = await new_user.save();
    res.send(savedUser);
    
  } catch (error){
    res.send(error.details.message);
  }
  
};