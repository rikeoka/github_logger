module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'issues',
    action: payload['action'],
    changed_body: typeof payload['changes.body.from'] !== 'undefined',
    changed_title: typeof payload['changes.title.from'] !== 'undefined',
    issue_id: payload['issue.id'],
    issue_number: payload['issue.number'],
    issue_state: payload['issue.state'],
    issue_author: payload['issue.user.login'],
    issue_author_id: payload['issue.user.id'],
    created_at: payload['issue.created_at'],
    updated_at: payload['issue.updated_at'],
    closed_at: payload['issue.closed_at'],
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
