// common includes
var should = require('chai').should();

// handler specific includes
var events = require('../../hooks/events');

describe('events', function () {
  it('List includes active handlers', function () {
    var validEvents = [
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
    events.eventTypes.should.eql(validEvents);
  });

  it('has a function that returns object when passed an object', function() {
    events.eventTypes.forEach(function(event) {
      events[event].should.be.a('function');
      events[event]({}).should.be.an('object');
    });
  });
});
