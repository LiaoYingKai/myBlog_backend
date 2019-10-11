function responseFormat(promise, res) {
	// 判斷是否傳進來爲 promise
	promise
		.then(({status, response}) => {
			res.status(status).json({
				response
			})
		})
		.catch(({status, message}) => {
			res.status(status).json({
				message
			})
		})
}

module.exports = {
	responseFormat,
}