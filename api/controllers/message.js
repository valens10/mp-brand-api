'use strict';
import jwt from 'jsonwebtoken';
require('dotenv').config();

import mongoose from 'mongoose';
const Message = mongoose.model('Messages');


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

exports.list_all_messages = async function (req, res, next) {
  try {
    const authUser = await checkAuthorization(req, res);
    if (authUser) {
      console.log("user: ", authUser)
      if (authUser.isAdmin) {

        // get all messages
        Message.find({}, function (err, message) {
          if (err) {
            res.send(err);
          } else {
            res.json(message);
          }

        });
      } else {
        res.send("You are not allowed to perform this action.")
      }
    } else {
      console.log("error with token")
      return;
    }

  } catch (error) {
    console.log(error)
  }
};

exports.create_a_message = function(req, res) {
  var new_message = new Message(req.body);
  new_message.save(function(err, message) {
    if (err)
      res.send(err.message);
    res.json(message);
  });
};


exports.get_a_message = function(req, res) {
  Message.findById(req.params.id, function(err, message) {
    if (err)
      res.send(err.message);
    res.json(message);
  });
};


exports.update_a_message = function (req, res) {
  Message.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, message) {
    if (err)
      res.send(err.message);
    res.json(message);
  });
};


exports.delete_a_message = async function (req, res) {
  const authUser = await checkAuthorization(req, res);
  if (authUser) {
    if (authUser.isAdmin) {
      Message.remove({
    _id: req.params.id
  }, function(err, message) {
    if (err)
      res.send(err.message);
    res.json({ message: 'Post successfully deleted.'});
  });
    } else {
      res.send("you are not allowed to perform this action")
    }
  } else {
    res.send("You are not authorized, please login first.")
  }
};
