var express = require('express');
var bodyParser = require('body-parser');
var SplunkLogger = require('splunk-logging').Logger;
var crypto = require('crypto');
var bufferEq = require('buffer-equal-constant-time');
var fs = require('fs');
var http = require('http');
var https = require('https');

var flatten = require('./utils/flatten');
var events = require('./hooks/events');

var app = express();
// if HMAC_SECRET is set use HMAC validation
if (!!process.env['HMAC_SECRET']) {
  app.post('/', hmacV, processWebhook);
} else {
  app.post('/', bodyParser.json(), processWebhook);
}
app.get('/ping', ping);
app.get('/index.html', ping);

// Setup logging to splunk if splunk configs are available
if (!!process.env['SPLUNK_TOKEN'] && !!process.env['SPLUNK_URL']) {
  var splunkConfig = {
    token: process.env['SPLUNK_TOKEN'],
    url: process.env['SPLUNK_URL']
  };
  Logger = new SplunkLogger(splunkConfig);
} else {
  Logger = console;
}

// Start server
var port = process.env.PORT || 3000;
var server = {};
var startHttps = false;
var certificate = {};

if (process.env['KEY_FILE'] && process.env['CERT_FILE'] && !process.env['HTTP_MODE']) {
  try {
    certificate = {
      key: fs.readFileSync(process.env['KEY_FILE']),
      cert: fs.readFileSync(process.env['CERT_FILE'])
    };
    startHttps = !process.env['HTTP_MODE'];
  } catch (e) {
    startHttps = false;
  }
}

if (startHttps) {
  server = https.createServer(certificate, app).listen(port, function() {
    console.log('Github Logger listening with HTTPS on port ' + port.toString());
  });
} else {
  server = http.createServer(app).listen(port, function() {
    console.log('Github Logger listening with HTTP on port ' + port.toString());
  });
}

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

function ping(req, res) {
  res.sendStatus(200);
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
