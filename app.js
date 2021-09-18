var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//post 请求插件
var bodyParser=require('body-parser');
var app = express();
//修改入口文件
var http = require('http');
var server = http.createServer(app);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//日志
// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*"); //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-type"); //跨域允许的请求方式
    res.header(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    ); //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
    res.header("Access-Control-Max-Age", 1728000); //预请求缓存20天
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

server.listen('3000',() => console.log("Example app listening on port 3000!"));
