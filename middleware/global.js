const { validationResult } = require('express-validator');
const { TOKEN_ERROR } = require('../enums/errorEnums');
const jwtUtil = require('../jwt')

module.exports = {
	accountPasswordVerify: function(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next()
	},
	tokenVerify: function(req, res, next) {
		const token = req.headers.token
		const jwt = new jwtUtil(token)
		const isVerify = jwt.verifyToken();
		if(isVerify === 'err') {
			return res.status(405).json({ message: TOKEN_ERROR });
		}
		next()
	}
}