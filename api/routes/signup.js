'use strict';
import signUpView from '../controllers/signUp';
export default function (app) {
  // signup endpoint
  app.route('/users/sign_up')
    .post(signUpView.signUp);
};