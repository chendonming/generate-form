var express = require('express');
var router = express.Router();
const pool = require('../config/mysqlPool');

/* GET home page. */
router.get('/', function (req, res, next) {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    conn.query('show tables', (err, rows) => {
      console.log(JSON.stringify(rows));
      res.render('index', { data: rows, title: '用户表测试' });
    })
  })
});

module.exports = router;
