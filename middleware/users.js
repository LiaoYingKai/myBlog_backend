const crypto = require('crypto'); // 加解密軟體 (內建模組)
const config = require('../config');

module.exports = {
	passwdCrypto: function(req, res, next) {
		req.body.password = crypto.createHash('md5')
								.update(req.body.password + config.salt)
								.digest('hex');
		next();
	}
}
