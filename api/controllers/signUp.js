'use strict';
import mongoose from 'mongoose';
import validationSchema from "../validation/validationSchema"
import bcrypt from 'bcrypt';
const User = mongoose.model('Users');

exports.signUp = async function (req, res) {
  try {
    const params = await validationSchema.userSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: params.email})
    if (doesExist) {
      res.send("User with this email is exist");
    }
      
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(params.password, salt);
    
    const user = { full_name: params.full_name, email: params.email, status: params.status, password: hashedPassword };
    const new_user = new User(user);
    const savedUser = await new_user.save();
    const message = "you have been successful registered"
    const response = {
      _id: savedUser._id,
      full_name: savedUser.full_name,
      isAdmin: savedUser.isAdmin,
      email: savedUser.email,
      created_at: savedUser.created_at
    };
    res.status(200).json({
      user: response,
      message
    });
    
  } catch (error){
    res.json({err:error.details[0].message});
  }
  
};