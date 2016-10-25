module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    'type': 'status',
    'status_id': payload['id'],
    'status_sha': payload['sha'],
    'status_context': payload['context'],
    'status_state': payload['state'],
    'created_at': payload['created_at'],
    'updated_at': payload['updated_at'],
    'time': new Date(),
    'repository_id': payload['repository.id'],
    'repository': payload['repository.full_name'],
    'sender': payload['sender.login'],
    'sender_id': payload['sender.id']
  };
};
