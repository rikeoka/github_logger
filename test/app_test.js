// common includes
var should = require('chai').should();

// test specific includes
var crypto = require('crypto');
var request = require('supertest');
var sinon = require('sinon');
var rewire = require('rewire');
var SplunkLogger = require('splunk-logging').Logger;

describe('app server', function() {
  var server;

  before(function() {
    delete process.env['HMAC_SECRET'];
    delete process.env['SPLUNK_TOKEN'];
    delete process.env['SPLUNK_URL'];
    delete process.env['HTTP_MODE'];
    delete process.env['KEY_FILE'];
    delete process.env['CERT_FILE'];
    body = '{"a": "b"}';
  });

  afterEach(function(done) {
    delete process.env['HMAC_SECRET'];
    delete process.env['SPLUNK_TOKEN'];
    delete process.env['SPLUNK_URL'];
    delete process.env['HTTP_MODE'];
    delete process.env['KEY_FILE'];
    delete process.env['CERT_FILE'];
    server.close(done);
  });

  describe('without HMAC (no HMAC_SECRET)', function() {
    beforeEach(function() {
      server = rewire('../app');
      server.__set__('console', {
        log: sinon.spy()
      });
      server.__set__('Logger', {
        log: sinon.spy()
      });
    });

    it('responds with 204 with valid event', function(done) {
      request(server)
        .post('/')
        .set('x-github-event', 'issue_comment')
        .set('content-type', 'application/json')
        .send(body)
        .expect(204, done);
    });

    it('responds with 500 with invalid event', function(done) {
      request(server)
        .post('/')
        .set('x-github-event', 'foo')
        .set('content-type', 'application/json')
        .send(body)
        .expect(500, done);
    });

    it('responds with 500 with missing event', function(done) {
      request(server)
        .post('/')
        .set('content-type', 'application/json')
        .send(body)
        .expect(500, done);
    });
  });

  describe('with HMAC (HMAC_SECRET)', function() {
    beforeEach(function() {
      process.env['HMAC_SECRET'] = 'test_secret';
      server = rewire('../app');
      server.__set__('console', {
        log: sinon.spy()
      });
      server.__set__('Logger', {
        log: sinon.spy()
      });
    });

    it('responds with 204', function(done) {
      request(server)
        .post('/')
        .set('x-github-event', 'issue_comment')
        .set('x-hub-signature', 'sha1=' + crypto.createHmac('sha1', 'test_secret').update(body).digest('hex'))
        .set('content-type', 'application/json')
        .send(body)
        .expect(204, done);
    });

    it('responds with 401 with invalid sig', function(done) {
      request(server)
        .post('/')
        .set('x-github-event', 'issue_comment')
        .set('x-hub-signature', 'sha1=wrong_digest')
        .set('content-type', 'application/json')
        .send(body)
        .expect(401, done);
    });

    it('responds with 401 with missing sig', function(done) {
      request(server)
        .post('/')
        .set('x-github-event', 'issue_comment')
        .set('content-type', 'application/json')
        .send(body)
        .expect(401, done);
    });

    it('responds with 500 with invalid event', function(done) {
      request(server)
        .post('/')
        .set('x-github-event', 'none')
        .set('x-hub-signature', 'sha1=' + crypto.createHmac('sha1', 'test_secret').update(body).digest('hex'))
        .set('content-type', 'application/json')
        .send(body)
        .expect(500, done);
    });

    it('responds with 500 with missing event', function(done) {
      request(server)
        .post('/')
        .set('x-hub-signature', 'sha1=' + crypto.createHmac('sha1', 'test_secret').update(body).digest('hex'))
        .set('content-type', 'application/json')
        .send(body)
        .expect(500, done);
    });
  });

  describe('without Splunk config (SPLUNK_TOKEN, SPLUNK_URL', function() {
    beforeEach(function() {
      server = rewire('../app');
      server.__set__('console', {
        log: sinon.spy()
      });
    });

    it('uses console.log', function() {
      server.__get__('Logger').should.eq(console);
    });
  });

  describe('with Splunk config (SPLUNK_TOKEN, SPLUNK_URL', function() {
    beforeEach(function() {
      process.env['SPLUNK_TOKEN'] = 'test_token';
      process.env['SPLUNK_URL'] = 'test_url';
      server = rewire('../app');
      server.__set__('console', {
        log: sinon.spy()
      });
    });

    it('uses splunk logger', function() {
      server.__get__('Logger').should.be.an.instanceOf(SplunkLogger);
    });
  });

  describe('server mode', function() {
    describe('with cert file and key file', function() {
      beforeEach(function() {
        process.env['KEY_FILE'] = 'test/fixtures/key.pem';
        process.env['CERT_FILE'] = 'test/fixtures/cert.pem';
        server = rewire('../app');
        server.__set__('console', {
          log: sinon.spy()
        });
      });

      it('creates https server', function() {
        server.__get__('startHttps').should.be.true;
      });
    });

    describe('with cert file and key file and HTTP_MODE set', function() {
      beforeEach(function() {
        process.env['KEY_FILE'] = 'test/fixtures/key.pem';
        process.env['CERT_FILE'] = 'test/fixtures/cert.pem';
        process.env['HTTP_MODE'] = 1;
        server = rewire('../app');
        server.__set__('console', {
          log: sinon.spy()
        });
      });

      it('creates http server', function() {
        server.__get__('startHttps').should.be.false;
      });
    });

    describe('with cert file and no key file', function() {
      beforeEach(function() {
        process.env['CERT_FILE'] = 'test/fixtures/cert.pem';
        server = rewire('../app');
        server.__set__('console', {
          log: sinon.spy()
        });
      });

      it('creates https server', function() {
        server.__get__('startHttps').should.be.false;
      });
    });

    describe('with key file and no cert file', function() {
      beforeEach(function() {
        process.env['KEY_FILE'] = 'test/fixtures/key.pem';
        server = rewire('../app');
        server.__set__('console', {
          log: sinon.spy()
        });
      });

      it('creates https server', function() {
        server.__get__('startHttps').should.be.false;
      });
    });

    describe('without cert file and key file', function() {
      beforeEach(function() {
        server = rewire('../app');
        server.__set__('console', {
          log: sinon.spy()
        });
      });

      it('creates https server', function() {
        server.__get__('startHttps').should.be.false;
      });
    });
  });
});
