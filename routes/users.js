const express = require('express')
const users = require('../modals/users')

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
		users.create(body, function(err, results, fields) {
			// TODO login error handle
			if(err) {
				if(err.sqlState === '23000') {
					res.status(403).json({error: 'account already exists'});
					return console.error(err)
				}
				res.sendStatus(500);
				return console.error(err);
			}

			// // 新的資源已建立 (回應新增資源的 id)
			res.status(201).json({message: "create successful"})
			// res.status(201).json(results);
		})
	})


module.exports = router
