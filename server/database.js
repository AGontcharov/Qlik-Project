var mysql = require('mysql');
var config = require('../config.json');

// Configure the database
var connection = mysql.createConnection({
  host: '127.0.0.1',
  database: config.mysql.database,
  user: config.mysql.user,
  password: config.mysql.password,
});

// Connect to the database
connection.connect(function(err) {
  if (err) throw err;
  console.log('Database Connected!');
});

module.exports = connection;