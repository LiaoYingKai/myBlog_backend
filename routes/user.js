const express = require('express')
const user = require('../models/user')

const router = express.Router()

router
	.post('/login', function(req, res) {
		const body = req.body
		user.login(body)
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
		user.create(body)
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
