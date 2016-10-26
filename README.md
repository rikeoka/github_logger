# github_logger

About
=====
Takes incoming gitHub webhooks, normalizes the event and ships them to Splunk

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