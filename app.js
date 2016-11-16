var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//加载路由文件
var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//设置表单格式 2种格式 json和urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置路由处理模块  所有访问网站根目录的请求都由index模块处理
//所有与用户user相关的操作请求都访问/users这个路径并且交给users路由模块处理
//所有的路由处理全部模块化 所有访问相同资源的请求都由同一个路由模块处理
//符合了RESTful的设计原则
app.use('/', index);
app.use('/users', users);
app.use('/article',article);

// catch 404 and forward to error handler
//捕捉错误路由
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //转到下一个中间件,做错误页面的渲染
  next(err);
});

// error handler  错误页面的渲染
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //渲染错误页面
  res.render('error');
});
//把app暴露给外界
module.exports = app;
