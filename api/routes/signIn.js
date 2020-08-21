'use strict';
import signInView from '../controllers/signIn';
module.exports = function (app) {
  // signup endpoint
  app.route('/users/sign_in')
    .post(signInView.signIn);
};