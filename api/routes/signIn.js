'use strict';
import signInView from '../controllers/signIn';
export default function (app) {
  // signup endpoint
  app.route('/users/sign_in')
    .post(signInView.signIn);
};