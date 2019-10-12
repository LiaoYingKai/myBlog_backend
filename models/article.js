const mysql = require('mysql')
const pool = require('../db-pool')
const { NO_THIS_ID } = require('../enums/errorEnums')
const { serverError } = require('./lib.js')

let sql = ''
let response = {}

module.exports = {
	// 取得文章列表(預設排列由新到舊)
	getArticleList: function(req, callback) {
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT article_id,title,author FROM articles order by created desc')
			pool.query(sql, function(err, results) {
				if(err) {
					console.log(err)
					reject(serverError)
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
				if(err) {
					console.log(err)
					reject(serverError)
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
						console.log(err)
						reject(serverError)
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
	// 取得熱門文章(預設取前 10 筆)
	getTopArticle: function(req, callback) {
		return new Promise((resolve, reject) => {
			sql = mysql.format('select article_id,title,author,view_count from articles order by view_count desc LIMIT 10')
			pool.query(sql, function(err, results) {
				if(err) {
					console.log(err)
					reject(serverError)
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
	createArticle: function(req, callback) {
		return new Promise((resolve, reject) => {
			sql = mysql.format('INSERT INTO articles SET ?', req)
			pool.query(sql, function(err, results) {
				if(err) {
					console.log(err)
					reject(serverError)
					return 
				}
				response = {
					status: 200,
					response: '建立成功'
				}
				resolve(response)
			})
		})
	},
	updateArticle: function() {

	},
	deleteArticle: function(article_id, callback) {
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT * from articles where article_id = ?' ,article_id)
			pool.query(sql, function(err, results) {
				if(err) {
					console.log(err)
					reject(serverError)
					return 
				}
				if(results.length === 0) {
					response = {
						status: 400,
						message: NO_THIS_ID,
					}
					reject(response)
					return 
				}
				sql = mysql.format('DELETE FROM articles where article_id = ?', article_id)
				pool.query(sql, function(err, results) {
					if(err) {
						console.log(err)
						reject(serverError)
						return 
					}
					response = {
						status: 200,
						response: '刪除成功'
					}
					resolve(response)
				})
			})
			
		})
	},
}
