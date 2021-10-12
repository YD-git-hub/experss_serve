import RETURNED from "../common/returned";
import Express from "express";
import path from "path";
import fs from "fs"
import setting from "../common/setting";
import {getNetworkIp} from "../common/IP"
export const _uploder= async (req:Express.Request,res:Express.Response)=>{
    const {file} =req;
    if(file?.originalname){
        //获取后缀名
        // const extname = path.extname(file.originalname)
        //获取上传成功之后的文件路径
        const filepath = file.path
        //上传之后文件的名称
        const filename = path.join(path.dirname(__dirname),'public','images',file.originalname)
        fs.rename(filepath,filename,err =>{
        if(!err){
            console.log(filename)
            res.json({
                code:RETURNED._SUCCESS,
                data:`${getNetworkIp()}:${setting.port}/images/${file.originalname}`,
                msg:'上传成功',
            })
        }else{
            console.log(err)
            res.json({
                code:RETURNED._ERROR,
                msg:'上传失败'
            })
        }
        })
    }
    
};