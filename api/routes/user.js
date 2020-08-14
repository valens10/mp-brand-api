'use strict';
module.exports = function(app) {
  var usersView = require('../controllers/user');

  // posts Routes
  app.route('/users')
    .get(usersView.list_all_users)
    .post(usersView.create_a_user);


  app.route('/users/:id')
    .get(usersView.get_a_user)
    .patch(usersView.update_a_user)
    .delete(usersView.delete_a_user);
};