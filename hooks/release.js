module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    'type': 'release',
    'action': payload['action'],
    'release_id': payload['release.id'],
    'release_tag': payload['release.tag_name'],
    'release_author': payload['release.author.login'],
    'release_author_id': payload['release.author.id'],
    'created_at': payload['release.created_at'],
    'updated_at': payload['release.updated_at'],
    'time': new Date(),
    'repository_id': payload['repository.id'],
    'repository': payload['repository.full_name'],
    'repository_private': payload['repository.private'],
    'sender': payload['sender.login'],
    'sender_id': payload['sender.id']
  };
};
