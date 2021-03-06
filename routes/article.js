const express = require('express')
const article = require('../models/article')
const { responseFormat } = require('./lib')
const { 
	getArticleList,
	getTopArticle,
	getArticle,
	createArticle,
	updateArticle,
	deleteArticle,
} = article;
const router = express.Router()
const { tokenVerify } = require('../middleware/global')

router
	.get('/list', function(req, res) {
		responseFormat(getArticleList(), res)
	})

router
	.get('/hot', function(req, res) {
		responseFormat(getTopArticle(), res)
	})

router
	.get('/:article_id', function(req, res) {
		const article_id = req.params.article_id
		responseFormat(getArticle(article_id), res)
	})

router
	.post('/create', tokenVerify, function(req, res) {
		const body = req.body
		responseFormat(createArticle(body), res)
	})

router
	.put('/modify', tokenVerify, function(req, res) {
		const body = req.body
		responseFormat(updateArticle(body), res)
	})

router
	.delete('/delete', tokenVerify, function(req, res) {
		const { article_id } = req.body
		responseFormat(deleteArticle(article_id), res)
	})

module.exports = router
