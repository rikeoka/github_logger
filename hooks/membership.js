module.exports = function(payload) {
  // Flattens the payload object to prevent null method errors if payload isn't complete
  return {
    type: 'membership',
    action: payload['action'],
    scope: payload['scope'],
    member: payload['member.login'],
    member_id: payload['member.id'],
    team: payload['team.slug'],
    team_id: payload['team.id'],
    team_name: payload['team.name'],
    team_permission: payload['team.permission'],
    organization: payload['organization.login'],
    organization_id: payload['organization.id'],
    time: new Date(),
    sender: payload['sender.login'],
    sender_id: payload['sender.id']
  };
};
