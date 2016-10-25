var crypto = require('crypto');
var bufferEq = require('buffer-equal-constant-time');

module.exports = function (algorithm, key, header, encoding) {
	var algorithm = algorithm;
	var key = key;
	var header = header;
	var encoding =  encoding || 'hex';

	return function(request, response, next) {
		var hmac = crypto.createHmac(algorithm, key);
		if (request.body) {
			hmac.update(request.body);
		}

		if (!request.headers || !request.headers[header]) { return response.sendStatus(401); }
		var computedHmac = new Buffer(hmac.digest(encoding));
		var receivedHmac = new Buffer(request.headers[header]);

		if (bufferEq(receivedHmac, computedHmac)) {
			next();
		} else {
			return response.sendStatus(401);
		}
	};
};
