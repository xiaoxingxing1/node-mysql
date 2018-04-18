var mysql = require('mysql');
var $dbConfig = require('../conf/database');

// 使用连接池
var pool = mysql.createPool($dbConfig.mysql);

/**
 * 对query执行的结果自定义返回JSON结果
 */
function responseDoReturn(res, result, resultJSON) {
  if (typeof result === 'undefined') {
    res.json({
      code: '201',
      msg: '执行失败'
    });
  } else {
    res.json(result);
  }
}

/**
 * 封装query之sql带不占位符
 */
function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    if(err){
      console.log('1-建立连接失败');
    }else{
      console.log('1-建立连接成功');
      console.log(pool._allConnections.length);
      connection.query(sql, function(err, rows) {
        callback(err, rows);
        //释放链接
        connection.release();
      });
    }
  });
}

/**
 * 封装query之sql带占位符
 */
function queryArgs(sql, args, callback) {
  pool.getConnection(function(err, connection) {
    if(err){
      console.log('2-建立连接失败');
    }else{
      console.log('2-建立连接成功');
      connection.query(sql, args, function(err, rows) {
        callback(err, rows);
        //释放链接
        connection.release();
      });
    }
  });
}

module.exports = {
  query: query,
  queryArgs: queryArgs,
  doReturn: responseDoReturn
};
