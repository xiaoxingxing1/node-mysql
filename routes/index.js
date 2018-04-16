var express = require('express');
var router = express.Router();
var todo = require('../dao/todo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/**
 * 增加一条todolist的接口
 */
router.get('/addTodoList', function(req, res, next) {
  todo.addTodoList(req,res,next);
  res.render('index');
});

module.exports = router;
