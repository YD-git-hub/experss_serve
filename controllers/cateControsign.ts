import { sign } from "./../util/sql";
let dbConfig = require("../util/dbconfig");
let RETURNED = require("../common/returned");
let cate =require('./cateContrologin')
import Express from "express"

const _sign= async (req:{body:{user_name:string,phone:string | Number,user_password:string,code:string}},res:Express.Response)=>{
    const { user_name,phone,user_password,code} = req.body;
    const codemsg = await cate.verif_code(code,res);
    if(codemsg=='验证成功!'){
        var sql = sign.insert;
        var sqlArr = {
            phone,
            user_name,
            user_password,
            login_date:new Date()
        };
        const _res = await dbConfig.dbAdd(sql,sqlArr)
        if(_res==='add'){
            res.json({
                code:RETURNED._SUCCESS,
                msg:'注册成功!'
            })
        }
    }
}

module.exports={
    _sign
}