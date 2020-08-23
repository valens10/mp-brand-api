'use strict';
module.exports = function (app) {
  var signInView = require('../controllers/signIn');

  // signup endpoint
  app.route('/users/sign_in')
    .post(signInView.signIn);
};