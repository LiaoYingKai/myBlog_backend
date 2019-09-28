const mysql = require('mysql')
const config = require('../config')

const connection = mysql.createConnection(config.db)
let sql = ''

module.exports = {
	users: function(req, callback) {
		sql = 'SELECT * FROM users';
		return connection.query(sql, callback);
	},
	login: function(req, callback) {
		sql = 'SELECT * FROM users';
		return connection.query(sql, callback);
	},
	create: function(req, callback) {
		sql = mysql.format('INSERT INTO users SET ?', req.body);
		return connection.query(sql, callback);
	}
}