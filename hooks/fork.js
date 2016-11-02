module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'fork',
    forked_repo_id: payload['forkee.id'],
    forked_repo_name: payload['forkee.full_name'],
    forked_owner_id: payload['forkee.owner.id'],
    forked_owner_login: payload['forkee.owner.login'],
    forked_owner_type: payload['forkee.owner.type'],
    created_at: payload['forkee.created_at'],
    updated_at: payload['forkee.updated_at'],
    pushed_at: payload['forkee.pushed_at'],
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
