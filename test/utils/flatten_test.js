var flatten = require('../../utils/flatten');
var should = require('chai').should();

describe('flatten', function() {
  it('flattens nested objects', function() {
    var orig = {hello: {world: {this: 'test'}}};
    var response = flatten(orig);
    response['hello.world.this'].should.equal('test');
  });

  it('flattens array with objects', function() {
    var orig = [{hello: {world: 'test1'}}, {hello: {world: 'test2'}}];
    var response = flatten(orig);
    response['[0].hello.world'].should.equal('test1');
    response['[1].hello.world'].should.equal('test2');
  });

  it('flattens object with array', function() {
    var orig = {hello: {world: ['test1', 'test2']}};
    var response = flatten(orig);
    response['hello.world[0]'].should.equal('test1');
    response['hello.world[1]'].should.equal('test2');
  });

  it('flattens object with empty array', function() {
    var orig = {hello: {world: []}};
    var response = flatten(orig);
    response['hello.world'].should.eql([]);
  });

  it('flattens object with empty object', function() {
    var orig = {hello: {world: {}}};
    var response = flatten(orig);
    response['hello.world'].should.eql({});
  });
});
