module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'deployment',
    deployment_id: payload['deployment.id'],
    deployment_sha: payload['deployment.sha'],
    deployment_environment: payload['deployment.environment'],
    deployment_description: payload['deployment.description'],
    created_at: payload['deployment.created_at'],
    updated_at: payload['deployment.updated_at'],
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
