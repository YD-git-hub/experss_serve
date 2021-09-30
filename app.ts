import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import http from 'http';
//token管理
import expressJwt from "express-jwt";
import * as vertoken from "./token/token";
//路由
import loginRouter from './routes/login';
import signRouter from './routes/sign';
//post 请求插件
import bodyParser from 'body-parser';
// 获取本地IP
import {getNetworkIp} from "./common/IP"
const app = express();
//修改入口文件
const server = http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//设置托管静态目录; 项目根目录+ public.可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg
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
//解析token获取用户信息
app.use(vertoken.sotoken);
//验证token是否过期且哪些不需要验证
app.use(expressJwt({
    secret:'zgs_first_token',
    algorithms:['HS256']
}).unless({
    path:['/login/code','/login/login']
}));
//token失效返回信息
app.use((err: { status: number; },req:express.Request,res:express.Response,next:()=>void)=>{
    if(err.status==401){
        return res.json({msg:'token失效'})
    }
});
app.use('/login', loginRouter);
app.use('/sign', signRouter);
server.listen('3000',() => console.log(`服务启动成功->地址为:http://${getNetworkIp()}:3000`));
