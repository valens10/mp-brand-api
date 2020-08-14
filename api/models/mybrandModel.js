'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Users Model
var UserSchema = new Schema({
    full_name: {
    type: String,
    required: 'Name is required'
    },
    email: {
    type: String,
    required: 'email is required'
    },
    status: {
    type: [{
    type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'INACTIVE' 
    }]
    },
    Created_at: {
    type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);

//Messages Model
var MessageSchema = new Schema({
    full_name: {
    type: String,
    required: 'Name is required'
    },
    email: {
    type: String,
    required: 'email is required'
    },
    message: {
    type: String,
    required: 'message is required'
    },
    Created_at: {
    type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Messages', MessageSchema);


//Posts Model
var PostSchema = new Schema({
    title: {
    type: String,
    required: 'Kindly enter the title of the article'
    },
    description: {
    type: String,
    required: 'Kindly enter the description of the article'
    },
    user: {
    type: String,
    required: 'Who created the article?'
    },
    Created_at: {
    type: Date,
    default: Date.now
    },
    category: {
    type: [{
    type: String,
    enum: ['technology', 'engineering', 'coding']
    }],
    default: ['technology']
  }
});

module.exports = mongoose.model('Posts', PostSchema);


//Comment Model
var CommentSchema = new Schema({
    post: {
    type: String,
    required: 'post is required'
    },
    comment: {
    type: String,
    required: 'comment is required'
    },
    user: {
    type: String,
    required: 'email is required'
    },
    Created_at: {
    type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Comments', CommentSchema);