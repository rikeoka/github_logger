var express = require('express');
var bodyParser = require('body-parser');
var SplunkLogger = require('splunk-logging').Logger;
var crypto = require('crypto');
var bufferEq = require('buffer-equal-constant-time');

var flatten = require('./utils/flatten');
var events = require('./hooks/events');

var app = express();
if (!!process.env['HMAC_SECRET']) {
  app.post('/', hmacV, processWebhook);
} else {
  app.post('/', bodyParser.json(), processWebhook);
}

if (!!process.env['SPLUNK_TOKEN'] && !!process.env['SPLUNK_URL']) {
  var splunkConfig = {
    token: process.env['SPLUNK_TOKEN'],
    url: process.env['SPLUNK_URL']
  };
  Logger = new SplunkLogger(splunkConfig);
} else {
  Logger = console;
}

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Github Logger listening on port 3000');
});

function processWebhook(req, res) {
  var payload = flatten(req.body);
  var githubEvent = req.get('x-github-event');

  if (events.eventTypes.includes(githubEvent)){
    payload = events[githubEvent](payload);
  } else {
    res.sendStatus(500);
    return;
  }
  Logger.log(payload);
  res.sendStatus(204);
}

function hmacV(req, res, next) {
  var payload = '';

  req.on('data', function(chunk) {
    payload += chunk;
  });

  req.on('end', function() {
    var calculated = new Buffer(signature(process.env['HMAC_SECRET'], payload));
    var provided = new Buffer(req.get('x-hub-signature') || '');

    if (bufferEq(calculated, provided)) {
      req.body = JSON.parse(payload);
      next();
    } else {
      return res.sendStatus(401);
    }
  });
}

function signature(secret, body) {
  return 'sha1=' + crypto.createHmac('sha1', secret).update(body).digest('hex');
}

module.exports = server;
