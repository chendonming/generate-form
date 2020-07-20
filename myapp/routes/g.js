var express = require('express');
var router = express.Router();
const pool = require('../config/mysqlPool');
const conf = require('../config/mysql.conf')
const ejs = require('ejs');

router.get('/tables', function (req, res, next) {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    conn.query('show tables', (err, rows) => {
      const newRows = rows.map(v => v[`Tables_in_${conf.database}`])
      res.json({
        code: 1,
        data: newRows
      });
    })
    pool.releaseConnection(conn);
  })
});

router.get('/columns', function (req, res, next) {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(`select column_name,column_comment,data_type from information_schema.columns where table_name='${req.query.name}'`, (err, rows) => {
      res.json({
        code: 1,
        data: rows.map(v => ({
          ...v,
          edit: false, // 编辑
          add: false, // 新增
          query: false, // 查询
          component: '', // 组件名称
        }))
      });
    })
    pool.releaseConnection(conn);
  })
})

router.post('/generate', function (req, res, next) {
  const list = req.body.list;
  console.log(list);
  const query = list.filter(v => v.query);
  ejs.renderFile('./views/form.ejs', { query }, function (err, str) {
    // str => 输出渲染后的 HTML 字符串
    if(err) throw err;
    console.log(str);
    res.json({
      code: 1,
      data: str
    })
  });
})

module.exports = router;