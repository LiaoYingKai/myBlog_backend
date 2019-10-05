const express = require('express')
const users = require('../models/users')

const router = express.Router()

router
	.post('/login', function(req, res) {
		const body = req.body
		users.login(body)
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
