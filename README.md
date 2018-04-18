# node.js 小例子之 mysql
###### node+mysql 的简单实践

### 全局安装 express 和 express-generator
`npm install express express-generator -g`

### 初始化项目
`express node-mysql`
```
项目目录结构如下:
├── app.js
├── bin //应用启动bin目录
│   └── www
├── package.json //应用的依赖包信息
├── public  //公共文件夹存放资源文件
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes //路由文件夹，实际上可以看做Controller
│   ├── index.js
│   └── users.js
└── views //顾名思义，就是视图了，存放模板文件
   ├── error.jade
   ├── index.jade
   └── layout.jade
```

### 声明 mysql 依赖
```
在 package.json 文件中声明一下项目的依赖
"mysql": "latest"
```

### 安装所有依赖
`npm install`

### 数据库相关配置
- 建 conf 文件夹，其内放数据库配置文件 database.js
- 建 common 文件夹，其内放对 mysql 操作的简单封装文件 basicConnection.js 和 使用键值对配置 mysql 命令语句的文件 sqlCommand.js

### 编写一个简单的 TodoList 页面
> 这里不用 jade，用 html 来写，所以把 views 文件夹下的 jade 文件先都删掉
> express 默认使用 jade 模板，可以配置让其支持使用 ejs 或 html 模板
- 安装 ejs
`npm install ejs --save`
- 在 app.js 中配置
```
var ejs = require('ejs'); 
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
```
- 建 dao 文件夹，即 model 层

### 启动
- 开启 mysql 服务
- `npm start`

# 遇到的问题
### Error: Can't set headers after they are sent
- 原因
```
错误直译：不能发送headers因为已经发送过一次了。在处理HTTP请求时，服务器会先输出响应头，然后再输出主体内容，而一旦输出过一次响应头，你再尝试设置响应头时，就会报这个错误。原因在于程序有问题，重复作出响应。
```

- 解决方案
```
加return解决 或者加
app.get('/*', function(req, res, next){ 
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});
```

