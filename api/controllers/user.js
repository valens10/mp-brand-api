'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('Users');

const {userSchema} = require('../validation/validationSchema');

exports.list_all_users = function (req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.create_a_user = async function (req, res) {
  try {
    const { full_name, email, status, password } = req.body;
    const params = await userSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: params.email })
    if (doesExist)
      res.send("User with this email is exist");
    
    const new_user = new User(params);
    const savedUser = await new_user.save();
    res.send(savedUser);
    
  } catch (error){
    res.send(error.details[0].message)
  }
  
};


exports.get_a_user = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err)
      res.send(err.message);
    res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err.message);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, user) {
    if (err)
      res.send(err.message);
    res.json({ message: 'Post successfully deleted.'});
  });
};