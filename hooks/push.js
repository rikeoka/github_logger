module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    'type': 'push',
    'ref': payload['ref'],
    'before': payload['before'],
    'head': payload['after'] || payload['head'],
    'created': payload['created'],
    'deleted': payload['deleted'],
    'forced': payload['forced'],
    'pusher': payload['pusher.name'],
    'pusher_email': payload['pusher.email'],
    'time': new Date(),
    'repository_id': payload['repository.id'],
    'repository': payload['repository.full_name'],
    'sender': payload['sender.login'],
    'sender_id': payload['sender.id']
  };
};
