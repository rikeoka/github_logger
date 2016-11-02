module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'page_build',
    build_id: payload['id'],
    build_status: payload['build.status'],
    build_commit: payload['build.commit'],
    build_duration: payload['build.duration'],
    pusher: payload['build.pusher.login'],
    pusher_id: payload['build.pusher.id'],
    created_at: payload['build.created_at'],
    updated_at: payload['build.updated_at'],
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
