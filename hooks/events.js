var Events = module.exports = {};

Events.eventTypes = eventTypes = [
  // 'download', deprecated
  // 'follow', deprecated
  // 'fork_apply', deprecated
  // 'gist', deprecated
  'commit_comment',
  'create',
  'delete',
  'deployment',
  'deployment_status',
  'fork',
  'gollum',
  'issue_comment',
  'issues',
  'member',
  'membership',
  'page_build',
  'public',
  'pull_request',
  'pull_request_review',
  'pull_request_review_comment',
  'push',
  'release',
  'repository',
  'status',
  'team_add',
  'watch'
];

eventTypes.forEach(function (type) {
  Events[type] = require('./' + type);
});
