const bodyparser = require('body-parser')
const express = require('express')
const cors = require('cors')
const auth = require('./lib/verification')
const config = require('./config')
const userRouter = require('./routes/user')
const articleRouter = require('./routes/article')
const globalMiddleware = require('./middleware/global')
const userMiddleware = require('./middleware/user')
const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/user', [auth.ACCOUNT_AUTH, auth.PASSWORD_AUTH], globalMiddleware.verification)
app.use('/user', userMiddleware.passwdCrypto , userRouter);

app.use(globalMiddleware.hasToken)
app.use('/article', articleRouter);

app.listen(config.port, function () {
	console.log('app listening on port ' + config.port + '!');
});