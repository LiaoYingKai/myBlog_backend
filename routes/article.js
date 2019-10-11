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


// router
// 	.get('/topArticle', function(req, res) {
// 		console.log(req)
// 		article.getArticle()
// 			.then(({status, response}) => {
// 				console.log(response)
// 				res.status(status).json({
// 					response
// 				})
// 			})
// 			.catch(({status, message}) => {
// 				res.status(status).json({
// 					message
// 				})
// 			})
// 	})

// router
// 	.get('/:id', function(req, res) {
// 		console.log(req.params)
// 		article.getArticle()
// 			.then(({status, response}) => {
// 				console.log(response)
// 				res.status(status).json({
// 					response
// 				})
// 			})
// 			.catch(({status, message}) => {
// 				res.status(status).json({
// 					message
// 				})
// 			})
// 	})

module.exports = router
