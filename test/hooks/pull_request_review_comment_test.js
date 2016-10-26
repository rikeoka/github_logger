// common includes
var flatten = require('../../utils/flatten');
var should = require('chai').should();

// handler specific includes
var handler = require('../../hooks/pull_request_review_comment');
var payload = require('../fixtures/pull_request_review_comment.json');

describe('pull_request_review_comment', function () {
  it('returns expected keys', function () {
    var response = handler({});
    response.should.have.all.keys(payload.clean);
  });

  it('processes payload file', function() {
    var contents = flatten(payload.payload);
    var response = handler(contents);
    var diff = (new Date()) - response['time'];
    delete response['time'];
    delete payload.clean.time;
    diff.should.be.lt(2 * 1000);
    response.should.be.eql(payload.clean);
  });

  it('detects changes', function() {
    var changes = {
      changes: {
        body: {
          from: ''
        }
      }
    };
    var response = handler(flatten(changes));
    response['changed_body'].should.be.true;
  });

  it('completes on empty object', function () {
    handler({}).should.be.an('object');
    handler({}).should.not.Throw;
  });
});
