const bodyparser = require('body-parser')
const express = require('express')

const config = require('./config')
const users = require('./modals/users')
const userRouter = require('./routes/users')
const app = express()

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/users', userRouter)

app.listen(config.port, function () {
	console.log('app listening on port ' + config.port + '!');
});