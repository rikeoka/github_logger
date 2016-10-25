var express = require('express');
var bodyParser = require('body-parser')

var hmacValidation = require("./utils/hmac")("sha1", process.env['HMAC_SECRET'], "HTTP_X_HUB_SIGNATURE")
var flatten = require('./utils/flatten');
var events = require('./hooks/events');


var app = express();
var jsonParser = bodyParser.json()

if (!!process.env['HMAC_SECRET']) {
  app.post('/', hmacValidation, jsonParser, processWebhook);
} else {
  app.post('/', jsonParser, processWebhook);
}

app.listen(3000, function() {
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
  console.log(event);
  res.sendStatus(204);
}

console.log(events);
events.eventTypes.forEach(function (type) {
  console.log(events[type]({}));
});
process.exit(1);
