module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'issue_comment',
    action: payload['action'],
    changed_body: typeof payload['changes.body.from'] !== 'undefined',
    issue_id: payload['issue.id'],
    issue_number: payload['issue.number'],
    issue_state: payload['issue.state'],
    issue_author: payload['issue.user.login'],
    issue_author_id: payload['issue.user.id'],
    comment_id: payload['comment.id'],
    comment_author: payload['comment.user.login'],
    comment_author_id: payload['comment.user.id'],
    created: payload['comment.created_at'],
    updated: payload['comment.updated_at'],
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
