const mysql = require('mysql')
const pool = require('../db-pool')

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
						message: '伺服器錯誤，請稍後在試'
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
	getArticle: function() {

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
