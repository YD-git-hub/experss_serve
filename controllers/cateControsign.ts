import { sign } from "./../util/sql";
import * as dbConfig from "../util/dbconfig";
import RETURNED from "../common/returned";
import Express from "express";
let cate =require('./cateContrologin');

export const _sign= async (req:{body:{user_name:string,phone:string | Number,user_password:string,code:string}},res:Express.Response)=>{
    const { user_name,phone,user_password,code} = req.body;
    const codemsg = await cate.verif_code(code,res);
    if(codemsg=='验证成功!'){
        var sql = sign.insert;
        var sqlArr = {
            user_name,
            phone,
            user_password,
            login_date:new Date()
        };
        const _res = await dbConfig.dbAdd(sql,sqlArr);
        if(_res==='add'){
            res.json({
                code:RETURNED._SUCCESS,
                msg:'注册成功!'
            });
        };
    };
};