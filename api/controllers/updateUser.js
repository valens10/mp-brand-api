'use strict';
import mongoose from 'mongoose';
const User = mongoose.model('Users');


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