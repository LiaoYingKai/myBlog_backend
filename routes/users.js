const express = require('express')
const users = require('../models/users')

const router = express.Router()

router
	.get('/', function(req, res) {
		users.users(req, function (err, results, fields) {
			if (err) {
				res.sendStatus(500);
				return console.error(err);
			}

			if (!results.length) {
				res.sendStatus(404);
				return;
			}

			res.json(results);
		});
	})

router
	.post('/login', function(req, res) {
		users.login(req, function (err, results, fields) {
			// TODO login error handle
			if (err) {
				res.sendStatus(500);
				return console.error(err);
			}

			if (!results.length) {
				res.sendStatus(404);
				return;
			}
			
			res.status(200).json(results);
		});
	})

router
	.post('/create', function(req, res){
		const body = req.body
		const { account, password, user_name } = body
		const { message, isCorrect } = verificationFormat(account, password, user_name)
		if(!isCorrect) {
			res.status(400).json({
				message
			})
			return 
		}
		users.create(body)
			.then(({status, message}) => {
				res.status(status).json({
					message
				})
			})
			.catch(({status, message}) => {
				res.status(status).json({
					message
				})
			})
	})

function verificationFormat(account, password, uesr_name = '') {
	function generateResults(message, isCorrect) {
		return {
			message, isCorrect
		}
	}
	if(account.length > 16 ){
		return generateResults('帳號不能超過 16 個字元', false)
	}
	if(!account) {
		return generateResults('帳號不能爲空', false)
	}
	if(!password) {
		return generateResults('密碼不能爲空', false)
	}
	if(uesr_name.length > 16){
		return generateResults('使用者名稱不能超過 16 個字元', false)
	}
	if(!uesr_name){
		return generateResults('使用者名稱不能爲空', false)
	}
	return generateResults('', true)
}

module.exports = router
