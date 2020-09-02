'use strict';
import mongoose from 'mongoose';
import jwt from'jsonwebtoken';
import bcrypt from 'bcrypt';
require('dotenv').config();
import validationSchema from "../validation/validationSchema"
const User = mongoose.model('Users');

exports.signIn = async function (req, res) {
  try {
    const params = await validationSchema.userLoginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: params.email})
      if (user == null)
          res.status(401).json({msg:"User does not exist. "});
    
    //check password
      if (await bcrypt.compare(params.password, user.password)) {
        const token = await jwt.sign({
          userId: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          name:user.name
        },
          process.env.PRIVATE_KEY,
          {algorithm: 'HS256',expiresIn: "1h"}
        );
        const response = {
          _id: user._id,
          full_name: user.full_name,
          isAdmin: user.isAdmin,
          email: user.email,
          created_at: user.created_at
        };

      res.status(200).json({
          user:response,
          message: "login success",
          token: token
      })
      
  }else {
      res.status(400).json({msg:"Not allowed, Incorect password"})
      
      } 
    
  } catch (error){
    res.json({err:error.details[0].message});;
  }

};
