var express = require('express');
var bodyParser = require('body-parser');
var SplunkLogger = require('splunk-logging').Logger;

var hmacValidation = require('hmac-express')('sha1', process.env['HMAC_SECRET'], '', {header: 'HTTP_X_HUB_SIGNATURE'});
var flatten = require('./utils/flatten');
var events = require('./hooks/events');

var app = express();
var jsonParser = bodyParser.json();

if (!!process.env['HMAC_SECRET']) {
  app.post('/', hmacValidation, jsonParser, processWebhook);
} else {
  app.post('/', jsonParser, processWebhook);
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

app.listen(process.env.PORT || 3000, function() {
  console.log('Github Logger listening on port 3000');
});

function processWebhook(req, res) {
  payload = flatten(req.body.payload);

  var githubEvent = req.header['X-GitHub-Event'];
  if ( githubEvent === 'gollum') { payload.pages = req.body.payload.pages; }
  if ( githubEvent === 'issues') { payload.labels = req.body.payload.issue.labels; }
  if (events.eventTypes.includes(githubEvent)){
    event = events[githubEvent](payload);
  } else {
    event = payload;
  }
  Logger.log(event);
  res.sendStatus(204);
}

Logger.log(events);
events.eventTypes.forEach(function (type) {
  Logger.log(events[type]({}));
});
