module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'gollum - wiki',
    time: new Date(),
    repository_id: payload['repository.id'],
    repository: payload['repository.full_name'],
    repository_private: payload['repository.private'],
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
