'use strict';

import mongoose from 'mongoose';
const  Message = mongoose.model('Messages');

exports.list_all_messages = function (req, res) {    
  Message.find({}, function(err, message) {
    if (err)
      res.send(err);
    res.json(message);
  });
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


exports.update_a_message = function(req, res) {
  Message.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, message) {
    if (err)
      res.send(err.message);
    res.json(message);
  });
};


exports.delete_a_message = function(req, res) {
  Message.remove({
    _id: req.params.id
  }, function(err, message) {
    if (err)
      res.send(err.message);
    res.json({ message: 'Post successfully deleted.'});
  });
};
