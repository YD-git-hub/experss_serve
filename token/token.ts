import jwt from "jsonwebtoken";
import Express from "express"
const jwtScrect='zgs_first_token';

//登录生成token
export const setToken=(user_name:string,id:string | Number)=>{
    return new Promise((resolve,reject)=>{
        const token=jwt.sign({user_name,id},jwtScrect,{expiresIn:'10s'});
        if(token) resolve(token);
        else reject({error:'token生成失败'})
    });
};

//各个接口需要验证token的方法
export const getToken=(token:string)=>{
    return new Promise((resolve,reject)=>{
        if(!token){
            reject({error:'token是空的'});
        }else{
            let info=jwt.verify(token.split(' ')[1],jwtScrect);
            resolve(info)
        }
    })
};

//解析token获取用户信息
export const sotoken=(req:Express.Request,res:Express.Response,next: () => void)=>{
    const token =req.headers['authorization'];
    if(token==undefined){
        next();
    }else{
        getToken(token).then(data=>{
           console.log(data)
        })
    }
};
