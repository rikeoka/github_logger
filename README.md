# github_logger

About
=====
Takes incoming gitHub webhooks, normalizes the event and ships them to Splunk.  

**Webhooks are sent over the Internet from gitHub.  It is _highly recommended_ to run this using HTTPS, but HTTP mode is 
provided for development and testing.  _Use of HTTP mode may result in the webhooks being intercepted in transit_**

Install
=======

```Bash
git clone https://www.github.com/rikeoka/github_logger.git
npm install
```

Usage
=====

```Bash
export SPLUNK_TOKEN=your_token
export SPLUNK_URL=your_splunk_url
export HMAC_SECRET=your_webhook_secret
export PORT=your_webserver_port
export KEY_FILE=your_private_key_file
export CERT_FILE=your_certificate_file
export HTTP_MODE=1-for_http_only, ignore_or_0-for_https_only
npm start

```

Testing
=======

```Bash
npm test
```

Configuration Options
=====================

* **SPLUNK_TOKEN** (**optional**) - your splunk token, if not present will log to console
* **SPLUNK_URL** (**optional**) - your splunk http collector do not include url path for example https://localhost:8088/,
if not present will log to console
* **HMAC_SECRET** (**optional**) - your secret configured in gitHub for the webhook.  If not present
will not use HMAC digest verification
* **PORT** (**optional**) - the port you wish the webserver to listen.  If not present 3000 is used.
* **KEY_FILE** (**recommended**) - the path to your private key PEM file.  If this and CERT_FILE is present HTTPS server
is started
* **CERT_FILE** (**recommended**) - the path to your certificate PEM file.  If this and KEY_FILE is present HTTPS server
is started
* **HTTP_MODE** (**optional**) - If set to any truthy vale ie 1, forces the server to start using HTTP.  Not recommended
to run this server in HTTP mode as any request from gitHub to the server would be sent in plain text and can be 
intercepted.

Contributing
============

1. Fork the repo.
2. Modify the code.
3. Write tests.
4. Submit a pull request.


Author
======
Robert Ikeoka<br/>
rikeoka@gmail.com<br/>
License: Apache 2.0<br/>
[![Build Status](https://travis-ci.org/rikeoka/github_logger.png)](https://travis-ci.org/rikeoka/github_logger)
