module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    'type': 'issues',
    'action': payload['action'],
    'changed': !!payload['changes.body.from'] || !!payload['changes.title.from'],
    'issue_id': payload['issue.id'],
    'issue_number': payload['issue.number'],
    'issue_title': payload['issue.title'],
    'issue_body': payload['issue.body'],
    'issue_state': payload['issue.state'],
    'issue_labels': payload['labels'],
    'issue_author': payload['issue.user.login'],
    'issue_author_id': payload['issue.user.id'],
    'created_at': payload['issue.created_at'],
    'updated_at': payload['issue.updated_at'],
    'closed_at': payload['issue.closed_at'],
    'comment_body': payload['comment.body'],
    'time': new Date(),
    'repository_id': payload['repository.id'],
    'repository': payload['repository.full_name'],
    'repository_private': payload['repository.private'],
    'sender': payload['sender.login'],
    'sender_id': payload['sender.id']
  };
};
