const express = require('express')
const article = require('../models/article')
const { responseFormat } = require('./lib')
const { getArticleList, getTopArticle, getArticle } = article;
const router = express.Router()

router
	.get('/list', function(req, res) {
		responseFormat(getArticleList(), res)
	})

router
	.get('/hot', function(req, res) {
		responseFormat(getTopArticle(), res)
	})

router
	.get('/:id', function(req, res) {
		const id = req.params.id
		responseFormat(getArticle(id), res)
	})

module.exports = router
