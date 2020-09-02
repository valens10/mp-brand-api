'use strict';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const User = mongoose.model('Users');


function checkAuthorization(req, res) {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).send({ msg: 'Access Denied, Login first.' });
    return 0;
  }
  try {
    const validToken = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = validToken;
    console.log("auth success")
    return req.user;
  } catch (error) {
    res.status(401).send({ msg: 'Invalid token' });
    return;
  }
}


exports.get_a_user = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err.message);
    res.json(user);
  });
};

  exports.update_a_user = async function (req, res) {
    const authUser = await checkAuthorization(req, res);
    if (authUser) {
      if (authUser.userId == req.params.id) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {
          const response = {
            _id: savedUser._id,
            full_name: savedUser.full_name,
            isAdmin: savedUser.isAdmin,
            email: savedUser.email,
            created_at: savedUser.created_at
          };
          if (err)
            res.json({err:err.message});
          res.status(204).json({user:response});
        });
      } else {
        res.status(405).json({msg:"you are not allowed to perform this Action."})
      }
    } else {
      res.status(401).json({msg:"Please login first."})
    }
};

  exports.delete_a_user = async function (req, res) {
    const authUser = await checkAuthorization(req, res);
    if (authUser) {
      if (authUser.isAdmin) {
        User.remove({ _id: req.params.id }, function (err, user) {
      if (err) {
        res.send(err.message);
      }
      res.json({ message: 'Post successfully deleted.' });
    });
      } else {
        res.status(401).json({msg:"Only Admin authorize for this Action."})
      }
    } else {
      res.send("Please login first.")
    }
  };