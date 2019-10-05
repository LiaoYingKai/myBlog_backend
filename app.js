const bodyparser = require('body-parser')
const express = require('express')
const cors = require('cors')

const auth = require('./lib/verification')
const config = require('./config')
const userRouter = require('./routes/users')
const globalMiddleware = require('./middleware/global')
const userMiddleware = require('./middleware/users')
const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/users', [auth.ACCOUNT_AUTH, auth.PASSWORD_AUTH], globalMiddleware.verification)
app.use('/users', userMiddleware.passwdCrypto , userRouter);

app.listen(config.port, function () {
	console.log('app listening on port ' + config.port + '!');
});