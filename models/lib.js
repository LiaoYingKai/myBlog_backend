const { SERVER_ERROR } = require('../enums/errorEnums')

const serverError = {
	status: 500,
	message: SERVER_ERROR
}

module.exports = {
	serverError
}