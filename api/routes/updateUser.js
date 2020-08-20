'use strict';
module.exports = function (app) {
  var updateusersView = require('../controllers/updateUser');

  //update and delete a user endpoint
  app.route('/update_user/:id')
    .get(updateusersView.get_a_user)
    .patch(updateusersView.update_a_user)
    .delete(updateusersView.delete_a_user);
};