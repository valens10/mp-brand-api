'use strict';
module.exports = function(app) {
  var articleView = require('../controllers/articles');

  // posts Routes
  app.route('/articles')
    .get(articleView.list_all_posts)
    .post(articleView.create_a_post);


  app.route('/articles/:id')
    .get(articleView.read_a_post)
    .patch(articleView.update_a_post)
    .delete(articleView.delete_a_post);
};