const { body } = require('express-validator')
const error = require('../enums/errorEnums')

const ACCOUNT_AUTH = body('account').trim().escape()
	.isLength({ min: 4 }).withMessage(error.ACCOUNT_TOO_SHORT)
	.isLength({ max: 16}).withMessage(error.ACCOUNT_TOO_LONG)

const PASSWORD_AUTH = body('password').trim().escape()
	.isLength({ min: 4 }).withMessage(error.PASSWORD_TOO_SHORT)
	.isLength({ max: 16}).withMessage(error.PASSWORD_TOO_LONG)

module.exports = {
	ACCOUNT_AUTH,
	PASSWORD_AUTH,
}

