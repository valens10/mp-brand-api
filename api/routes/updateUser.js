'use strict';
import updateusersView from '../controllers/updateUser';
export default function (app) {
  //update and delete a user endpoint
  app.route('/update_user/:id')
    .get(updateusersView.get_a_user)
    .patch(updateusersView.update_a_user)
    .delete(updateusersView.delete_a_user);
};