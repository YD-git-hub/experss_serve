import jwt from "jsonwebtoken";
import Express from "express"
const jwtScrect='zgs_first_token';

//登录生成token
export const setToken=(id:string | Number)=>{
    return new Promise((resolve,reject)=>{
        //生产token
        const token=jwt.sign({id},jwtScrect,{expiresIn:60*15});
        if(token) resolve(token);
        else reject({error:'token生成失败'})
    });
};

//各个接口需要验证token的方法
export const getToken=(token:string)=>{
    return new Promise((resolve,reject)=>{
        if(!token){
            reject({code:404,msg:'token是空的'});
        }else{
            //验证token
            let info=jwt.verify(token.split(' ')[1],jwtScrect);
            resolve(info)
        }
    })
};

//解析token获取用户信息
export const sotoken=(req:Express.Request,res:Express.Response,next: () => void)=>{
    if(req.headers['authorization']!=undefined){
        const token=req.headers['authorization'];
        getToken(token).then((data)=>{
            if(data){
                next();
            }
        });
    }else{
        next();
    }
};
