'use strict';
module.exports = function(app) {
  var postView = require('../controllers/post');

  // posts Routes
  app.route('/posts')
    .get(postView.list_all_posts)
    .post(postView.create_a_post);


  app.route('/posts/:id')
    .get(postView.read_a_post)
    .patch(postView.update_a_post)
    .delete(postView.delete_a_post);
};