import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
let loginRouter=require('./routes/login')
let signRouter=require('./routes/sign')
//post 请求插件
// import bodyParser from 'body-parser';
const app = express();
//修改入口文件
import http from 'http';
const server = http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.all('*', function(req:any, res: { header: (arg0: string, arg1: string) => void; }, next:any) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
app.use('/login', loginRouter);
app.use('/sign', signRouter);
server.listen('3000',() => console.log("Example app listening on port 3000!"));
