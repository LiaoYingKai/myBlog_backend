const express = require('express')
const user = require('../models/user')
const { responseFormat } = require('./lib')
const { login, create } = user
const router = express.Router()

router
	.post('/login', function(req, res) {
		const body = req.body
		responseFormat(login(body), res)
	})

router
	.post('/create', function(req, res){
		const body = req.body
		responseFormat(create(body), res)
	})

module.exports = router
