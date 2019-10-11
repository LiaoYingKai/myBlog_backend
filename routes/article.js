const express = require('express')
const article = require('../models/article')

const router = express.Router()

router
	.get('/list', function(req, res) {
		article.getArticleList()
			.then(({status, response}) => {
				res.status(status).json({
					response
				})
			})
			.catch(({status, message}) => {
				res.status(status).json({
					message
				})
			})
	})

router
	.get('/hot', function(req, res) {
		article.getTopArticle()
			.then(({status, response}) => {
				console.log(response)
				res.status(status).json({
					response
				})
			})
			.catch(({status, message}) => {
				res.status(status).json({
					message
				})
			})
	})

router
	.get('/:id', function(req, res) {
		const id = req.params.id
		article.getArticle(id)
			.then(({status, response}) => {
				res.status(status).json({
					response
				})
			})
			.catch(({status, message}) => {
				res.status(status).json({
					message
				})
			})
	})



module.exports = router
