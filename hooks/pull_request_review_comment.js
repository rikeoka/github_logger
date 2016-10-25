module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    'type': 'pull_request_review_comment',
    'action': payload['action'],
    'changed': !!payload['changes.body.from'],
    'comment_id': payload['comment.id'],
    'comment_path': payload['comment.path'],
    'comment_author': payload['comment.user.login'],
    'comment_author_id': payload['comment.user.id'],
    'pr_id': payload['pull_request.id'],
    'pr_number': payload['number'],
    'pr_state': payload['pull_request.state'],
    'pr_branch': payload['pull_request.head.ref'],
    'pr_branch_sha': payload['pull_request.head.sha'],
    'pr_base': payload['pull_request.base.ref'],
    'pr_base_sha': payload['pull_request.base.sha'],
    'pr_merged': payload['pull_request.merged'],
    'pr_merged_by': payload['pull_request.merged_by.login'],
    'pr_merged_by_id': payload['pull_request.merged_by.id'],
    'created_at': payload['comment.created_at'],
    'updated_at': payload['comment.updated_at'],
    'time': new Date(),
    'repository_id': payload['repository.id'],
    'repository': payload['repository.full_name'],
    'sender': payload['sender.login'],
    'sender_id': payload['sender.id']
  };
};
