# github_logger

About
=====
Takes incoming gitHub webhooks, normalizes the event and ships them to Splunk.  

Warning
=======
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

Docker Usage
============

* Move your cert files into ./cert if you wish to bundle your cert in the image.  This may be a security concern
and it may be better to link your cert files when running the image
* Build the docker image
```Bash
sudo docker build --tag=github_logger:latest .
```
* Run the docker image, there are several ways to do this:
    * Run with individually declared env variables
    ```Bash
    sudo docker run -d -p 443:443 --name=github_logger --env SPLUNK_TOKEN=token --env SPLUNK_URL=url github_logger:latest 
    ```
    * Run with env variable file
    ```Bash 
    sudo docker run -d -p 443:443 --name=github_logger --env-file .env github_logger:latest 
    ```
    * Run with cert folder linking
    ```Bash 
    sudo docker run -d -p 443:443 --name=github_logger --env-file .env -v $HOME/certs:/cert github_logger:latest
    ```
* View tail of logs:
```Bash
sudo docker logs github_logger
```
* Stop the container:
```Bash
sudo docker stop github_logger
```
* Remove the container after stopping:
```Bash
sudo docker rm github_logger
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
if not present will log to console - example: "https://splunk.local:8088"
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

Organization Configuration
==========================

To configure your organization to send events to the logging webapp, perform the following:
* Go to your organization webhook settings at https://www.github.com/organizations/:org_name/settings/hooks
* Click 'Add Webhook'
* Enter your server URL in 'Payload URL' **See warning above**
* Set 'Content-Type' to 'application/json'
* Enter a randomly generated sequence of ASCII characters in the 'Secret' field.  This is used for HMAC signature
verification.


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
