var dbConfig=require('../util/dbconfig');
const sqlbud = require('../util/sql');
//登录
Login=async (req,res)=>{
    let {phone}=req.body
    let data=await verifyLogin(phone)
    if(data){
        //查找成功进行登录验证

        res.json({
            code: "200",
            msg: "查找成功",
            data: data,
        });
    }else{
        res.json({
            code: "-1",
            msg: "账号不存在!",
        });
    }
};
//验证账号是存在
let verifyLogin = async (phone)=>{
    var sql=sqlbud['login'].select_phone
    var sqlArr={
        'phone':phone
    }
    let res=await dbConfig.dbfind(sql,sqlArr)
    if (res.result != "undefined" && res.result === "select") {
        return res.data
    }else{
        return false
    }
}
//验证账号密码是否匹配
let verifyname = async (phone,password)=>{
    var sql=sqlbud['login'].select_phone
    var sqlArr={
        'phone':phone,
        'user_password':password
    }
    let res=await dbConfig.dbfind(sql,sqlArr)
    if (res.result != "undefined" && res.result === "select") {
        return res.data
    }else{
        return false
    }
}
//暴露
module.exports ={
    Login,
} 