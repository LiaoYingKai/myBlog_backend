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

			// 沒有找到指定的資源
			if (!results.length) {
				res.sendStatus(404);
				return;
			}

			res.json(results);
		});
	})


module.exports = router
