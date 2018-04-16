var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');

/**
 * 增加一条todolist
 */
function addTodoList(req, res, next){
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    // 执行Query
    db.queryArgs($sqlCommands.todo.insertOne, 
        [param.name], 
        function(err, result) {
            if(!err){
                result = {
                    code: 200,
                    msg:'操作成功'
                }; 
            }
            // 以json形式，把操作结果返回给前台页面
            db.doReturn(res, result);
        }
    );
}

// exports
module.exports = {
    addTodoList: addTodoList
};
