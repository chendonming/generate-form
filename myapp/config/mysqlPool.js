const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool(require('./mysql.conf'));

module.exports = pool;