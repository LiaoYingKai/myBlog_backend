const bodyparser = require('body-parser')
const express = require('express')

const config = require('./config')
const app = express()

app.listen(config.port, function () {
	console.log('app listening on port ' + config.port + '!');
});