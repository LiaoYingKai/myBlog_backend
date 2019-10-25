const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = {
	generateToken(data) {
		const created = Math.floor(Date.now() / 1000)
		const cert = fs.readFileSync(path.join(__dirname, '../key/rsa_private_key.pem'));
		const token = jwt.sign({
			data,
			exp: created + 60 * 30,
		}, cert, {algorithm: 'RS256'})
		return token
	},
	verifyToken(token) {
		const cert = fs.readFileSync(path.join(__dirname, '../key/rsa_public_key.pem'));
		let res;
		try {
			const result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
			const {exp = 0} = result
			const current = Math.floor(Date.now() / 1000);
			if (current <= exp) {
				res = result.data || {};
			}
		} catch (e) {
			res = 'err';
		}
		return res;
	}
}
