'use strict';
import mongoose from 'mongoose';
import jwt from'jsonwebtoken';
import bcrypt from 'bcrypt';
import validationSchema from "../validation/validationSchema"
const User = mongoose.model('Users');

exports.signIn = async function (req, res) {
  try {
    const params = await validationSchema.userLoginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: params.email})
      if (user == null)
          res.send("User does not exist. ");
    
    //check password
      if (await bcrypt.compare(params.password, user.password)) {
        const token = await jwt.sign({
          userId: user._id
        },
          process.env.PRIVATE_KEY,
          {
            algorithm: 'HS256',
            expiresIn: "1h"
          }
        );

      res.status(200).json({
          user,
          message: "Auth success",
          token: token.split(".")[0]
      })
      
  }else {
      res.status(400).send("Not allowed, Incorect password")
      
      } 
    
  } catch (error){
    res.send(error.details[0].message);
  }

};
