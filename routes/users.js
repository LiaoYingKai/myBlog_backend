const express = require('express')
const users = require('../models/users')

const router = express.Router()

router
	.get('/', function(req, res) {
		console.log(req, res)
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

module.exports = router
