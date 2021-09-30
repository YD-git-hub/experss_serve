import { login } from "./../util/sql";
import * as dbConfig from "../util/dbconfig";
import RETURNED from "../common/returned";
import Express from "express"
import {setToken} from "../token/token"
//存储验证码
let verifcode = "";
//登录
export const _Login = async (
  req: { body: { phone: string | Number; user_password: string; code: string } },
  res: Express.Response
) => {
  const { phone, user_password, code } = req.body;
  const codemsg = verif_code(code, res);
  const _data = await verifyLogin(phone, res);
  const _data_1 = await verifyname(phone, user_password, res);
  if(codemsg === "验证成功!" && _data && _data_1 ){
    const {id}=_data_1
    setToken(id).then(token=>{
      res.json({
          code: RETURNED._SUCCESS,
          msg: _data_1,
          token:token
      });
    });
  };
};
export const _Code = (req:Express.Request, res: Express.Response) => {
  verifcode = verificationcode();
  if (verifcode) {
    res.json({
      code:RETURNED._SUCCESS,
      msg: "获取成功",
      data: verifcode,
    });
  } else {
    res.json({
      code:RETURNED._ERROR,
      msg: "获取失败",
    });
  }
};
//验证账号是否存在
let verifyLogin = async (phone: string | Number , res: Express.Response) => {
  var sql = login.select_phone;
  var sqlArr = {
    phone
  };
  let _data:any = await dbConfig.dbfind(sql, sqlArr);
  if (_data.result != "undefined" && _data.result === "select") {
    return _data.data;
  } else {
    res.json({
      code: RETURNED._ERROR,
      msg: "账号不存在!",
    });
  }
};
//验证账号密码是否匹配
let verifyname = async (phone:string | Number, user_password: string, res: Express.Response) => {
  var sql = login.select_login;
  var sqlArr = {
    phone,
    user_password
  };
  let _data:any = await dbConfig.dbfind(sql, sqlArr);
  if (_data.result != "undefined" && _data.result === "select") {
    return _data.data;
  } else {
    res.json({
      code: RETURNED._ERROR,
      msg: "账号或密码错误!",
    });
  }
};
//验证验证码是否匹配
export let verif_code = (code: string, res: Express.Response) => {
  if (verifcode === code) return "验证成功!";
  else res.json({ code: RETURNED._ERROR, msg: "验证验有误请重新输入!" });
};
//随机4位验证吗
let verificationcode = () => {
  const codes = [];
  const arr = []; //定义个数组保存4位随机数
  for (let i = 48; i <= 57; i++) {
    codes.push(i);
  }
  for (let i = 65; i <= 90; i++) {
    codes.push(i);
  }
  for (let i = 97; i <= 122; i++) {
    codes.push(i);
  }
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * (61 - 0 + 1) + 0);
    let char = String.fromCharCode(codes[index]); //转换为字母
    arr.push(char);
  }
  return arr.join(""); //将数组转为字符串，以空格分隔，并返回
};
