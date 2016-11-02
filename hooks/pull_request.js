module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'pull_request',
    action: payload['action'],
    changed_body: typeof payload['changes.body.from'] !== 'undefined',
    changed_title: typeof payload['changes.title.from'] !== 'undefined',
    pr_id: payload['pull_request.id'],
    pr_number: payload['number'],
    pr_state: payload['pull_request.state'],
    pr_author: payload['pull_request.user.login'],
    pr_author_name: payload['pull_request.user.id'],
    pr_branch: payload['pull_request.head.ref'],
    pr_branch_sha: payload['pull_request.head.sha'],
    pr_base: payload['pull_request.base.ref'],
    pr_base_sha: payload['pull_request.base.sha'],
    pr_merged: payload['pull_request.merged'],
    pr_merged_by: payload['pull_request.merged_by.login'] || null,
    pr_merged_by_id: payload['pull_request.merged_by.id'] || null,
    created_at: payload['pull_request.created_at'],
    updated_at: payload['pull_request.updated_at'],
    closed_at: payload['pull_request.closed_at'],
    merged_at: payload['pull_request.merged_at'],
    merged_commit_sha: payload['pull_request.merged_commit_sha'] || null,
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
