const mysql = require('mysql')
const jwtUtil = require('../jwt')
const pool = require('../db-pool')
const { serverError } = require('./lib.js')

let sql = ''
let response = {}

module.exports = {
	login: function(req, callback) {
		let { account, password } = req
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT * FROM users WHERE account = ? ;', [account])
			pool.query(sql, function(err, results){
				if(err) {
					console.log(err)
					reject(serverError)
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
							reject(serverError)
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
						const jwt = new jwtUtil(account)
						const token = jwt.generateToken()
						response = {
							status: 200,
							response: {
								message: '登入成功',
								token,
							}
						}
						resolve(response)
					})
				}
			})
		})
	},
	create: function(req, callback) {
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT * FROM users WHERE account = ? ;', [req.account])
			pool.query(sql, function(err, results, fields){
				if(err) {
					console.log(err)
					reject(serverError)
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
							reject(serverError)
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