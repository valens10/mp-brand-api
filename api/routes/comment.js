'use strict';
import commentsView from '../controllers/comment';
module.exports = function(app) {
  // posts Routes
  app.route('/comments')
    .get(commentsView.list_all_comment)
    .post(commentsView.create_a_comment);


  app.route('/comments/:id')
    .get(commentsView.get_a_comment)
    .patch(commentsView.update_a_comment)
    .delete(commentsView.delete_a_message);
};