var crypto = require("crypto");

module.exports = function (algorithm, key, header) {
	var algorithm = algorithm;
	var key = key;
	var header = header;
	var encoding =  "hex";

	return function(request, response, next) {
		var hmac = crypto.createHmac(algorithm, key);
    if (request.body) {
			hmac.update(request.body);
		}

    if (!request.headers || !request.headers[header]) return response.sendStatus(401);
    var computedHmac = hmac.digest(encoding);
    var receivedHmac = request.headers[header];

    if (receivedHmac !== computedHmac) return response.sendStatus(401);
		next()
	}
}
