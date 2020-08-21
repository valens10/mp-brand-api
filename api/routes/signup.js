'use strict';
import signUpView from '../controllers/signUp';
module.exports = function (app) {
  // signup endpoint
  app.route('/users/sign_up')
    .post(signUpView.signUp);
};