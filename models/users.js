const mysql = require('mysql')
const config = require('../config')

const db = mysql.createConnection(config.db)
let sql = ''

module.exports = {
	users: function(req, callback) {
		sql = 'SELECT * FROM users';
		return db.query(sql, callback);
	},
	login: function(req, callback) {
		const { account, password } = req.body
		sql = mysql.format('SELECT * FROM users WHERE account = ? AND password = ?', [account, password])
		return db.query(sql, callback);
	},
	create: function(req, callback) {
		let result = {};
		return new Promise((resolve, reject) => {
			sql = mysql.format('SELECT * FROM users WHERE account = ? ;', [req.account])
			db.query(sql, function(err, results, fields){
				if(err) {
					console.log(error)
					result = {
						status: 500,
						message: '伺服器錯誤，請稍後在試'
					}
					reject(result)
					return 
				}
				if(results.length >= 1) {
					result = {
						status: 400,
						message: '帳號已存在'
					}
					reject(result)
				} else {
					sql = mysql.format('INSERT INTO users SET ?', req);
					db.query(sql, function(err, results){
						if(err) {
							console.log(error)
							result = {
								status: 500,
								message: '伺服器錯誤，請稍後在試'
							}
							reject(result)
							return 
						}
						result = {
							status: 200,
							message: '註冊成功'
						}
						resolve(result)
					})
				}
			})
		})
		// return db.query(sql, function(err, results, fields){
		// 	if(err) {
		// 		return {
		// 			status: 500,
		// 			meeage: '伺服器錯誤，請稍後在試'
		// 		}
		// 	}
		// 	if(results.length >= 1) {
		// 		return {
		// 			status: 400,
		// 			message: '帳號已存在'
		// 		}
		// 	} else {
		// 		sql = mysql.format('INSERT INTO users SET ?', req);
		// 		return db.query(sql, function(err, results, fields){
		// 			if(err) {
		// 				return {
		// 					status: 500,
		// 					meeage: '伺服器錯誤，請稍後在試'
		// 				}
		// 			}
		// 			return {
		// 				status: 201,
		// 				message: '帳號建立成功'
		// 			}
		// 		});
		// 	}
		// })
	}
}