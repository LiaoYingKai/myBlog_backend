const mysql = require('mysql')
const pool = require('../db-pool')
const { SERVER_ERROR, NO_THIS_ID } = require('../enums/errorEnums')

let sql = ''

module.exports = {
	// 取得文章列表
	getArticleList: function(req, callback) {
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT article_id,title,author FROM articles')
			pool.query(sql, function(err, results) {
				let response;
				if(err) {
					console.log(err)
					response = {
						status: 500,
						message: SERVER_ERROR
					}
					reject(response)
					return
				}
				response = {
					status: 200,
					response: results,
				}
				resolve(response)
			})
		})
	},
	// 取得文章內容
	getArticle: function(id, callback) {
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT * FROM articles where article_id= ?', id)
			pool.query(sql, function(err, results) {
				let response;
				if(err) {
					console.log(err)
					response = {
						status: 500,
						message: SERVER_ERROR
					}
					reject(response)
					return
				}
				if(results.length === 0) {
					response = {
						status: 400,
						message: NO_THIS_ID
					}
					reject(response)
					return 
				}
				sql = mysql.format('update articles set view_count=view_count+1 where article_id=?', id)
				pool.query(sql, function(err, results) {
					if(err) {
						response = {
							status: 500,
							message: SERVER_ERROR
						}
						reject(response)
						return
					}
				})
				response = {
					status: 200,
					response: results[0],
				}
				resolve(response)
			})
		})
	},
	// 取得熱門文章
	getTopArticle: function() {

	},
	createArticle: function() {

	},
	updateArticle: function() {

	},
	deleteArticle: function() {

	},
}
