module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    'type': 'deployment_status',
    'deployment_status_id': payload['deployment_status.id'],
    'deployment_state': payload['deployment_status.state'],
    'deployment_target_url': payload['deployment_status.target_url'],
    'deployment_status_description': payload['deployment_status.description'],
    'deployment_id': payload['deployment.id'],
    'created': payload['deployment_status.created_at'],
    'updated': payload['deployment_status.updated_at'],
    'time': new Date(),
    'repository_id': payload['repository.id'],
    'repository': payload['repository.full_name'],
    'repository_private': payload['repository.private'],
    'sender': payload['sender.login'],
    'sender_id': payload['sender.id']
  };
};
