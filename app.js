const bodyparser = require('body-parser')
const express = require('express')

const config = require('./config')
const userRouter = require('./routes/users')
const userMiddleware = require('./middleware/users')
const app = express()

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/users', userMiddleware.passwdCrypto, userRouter)

app.listen(config.port, function () {
	console.log('app listening on port ' + config.port + '!');
});