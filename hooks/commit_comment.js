module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    'type': 'commitCommentEvent',
    'action': payload['action'],
    'commit_id': payload['comment.commit_id'],
    'comment_position': payload['comment.position'],
    'comment_line': payload['comment.line'],
    'comment_path': payload['comment.path'],
    'comment_id': payload['comment.comment_id'],
    'comment_body': payload['comment.body'],
    'comment_author': payload['comment.user.login'],
    'comment_author_id': payload['comment.user.id'],
    'created': payload['comment.created_at'],
    'updated': payload['comment.updated_at'],
    'time': new Date(),
    'repository_id': payload['repository.id'],
    'repository': payload['repository.full_name'],
    'repository_private': payload['repository.private'],
    'sender': payload['sender.login'],
    'sender_id': payload['sender.id']
  };
};
