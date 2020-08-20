'use strict';
module.exports = function (app) {
  var signUpView = require('../controllers/signUp');

  // signup endpoint
  app.route('/users/sign_up')
    .post(signUpView.signUp);
};