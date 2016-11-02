module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'pull_request_review',
    action: payload['action'],
    review_id: payload['review.id'],
    reviewer: payload['review.user.login'],
    reviewer_id: payload['review.user.id'],
    review_state: payload['review.state'],
    review_submitted_at: payload['review.submitted_at'],
    pr_id: payload['pull_request.id'],
    pr_number: payload['pull_request.number'],
    pr_state: payload['pull_request.state'],
    pr_branch: payload['pull_request.head.ref'],
    pr_branch_sha: payload['pull_request.head.sha'],
    pr_base: payload['pull_request.base.ref'],
    pr_base_sha: payload['pull_request.base.sha'],
    pr_merged: payload['pull_request.merged'] || null,
    pr_merged_by: payload['pull_request.merged_by.login'] || null,
    pr_merged_by_id: payload['pull_request.merged_by.id'] || null,
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
