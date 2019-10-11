const mysql = require('mysql')
const pool = require('../db-pool')
const { SERVER_ERROR } = require('../enums/errorEnums')
let sql = ''

module.exports = {
	login: function(req, callback) {
		let { account, password } = req
		let response = {}
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT * FROM users WHERE account = ? ;', [account])
			pool.query(sql, function(err, results){
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
						message: '帳號不存在'
					}
					reject(response)
					return
				} else {
					sql = mysql.format('SELECT * FROM users WHERE account = ? AND password = ?', [account, password])
					pool.query(sql, function(err, results){
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
								message: '密碼錯誤'
							}
							reject(response)
							return 
						}
						response = {
							status: 200,
							response: '登入成功'
						}
						resolve(response)
					})
				}
			})
		})
	},
	create: function(req, callback) {
		let response = {};
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT * FROM users WHERE account = ? ;', [req.account])
			pool.query(sql, function(err, results, fields){
				if(err) {
					console.log(err)
					response = {
						status: 500,
						message: SERVER_ERROR
					}
					reject(response)
					return 
				}
				if(results.length >= 1) {
					response = {
						status: 400,
						message: '帳號已存在'
					}
					reject(response)
					return
				} else {
					sql = mysql.format('INSERT INTO users SET ?', req);
					pool.query(sql, function(err, results){
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
							response: '註冊成功'
						}
						resolve(response)
					})
				}
			})
		})
	}
}