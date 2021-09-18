const mysql = require('mysql');
const mysqlConfig = require('./mysqlConfig');
const json = require("./json");
const sql = require('./sql');
const pool = mysql.createPool(mysqlConfig);
/**
 * @description 新增一条数据
 * @param  {str} table 数据库表的名称
 * @param  {obj} req 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */
let dbAdd = (table, req, res, next) => {
    pool.getConnection((err, conn) => {
        let paramValue = paramList(req);
        conn.query(sql[table].insert, [...paramValue], (err, result) => {
            if (result) {
                result = "add";
            }
            // 以json形式，把操作结果返回给前台页面
            json(res, result, err);
            // 释放连接
            conn.release();
        });
    });
};

/**
 *@description 删除一条数据
  @param 同abAdd
 */
let dbDelete = (sql, req) => {
    return new Promise((resolve,reject)=>{
        let paramValue=paramList(req);
        pool.getConnection((err,coon)=>{
            conn.query(sql,[...paramList],(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    if(result.affectedRows>0){
                        result='delete';
                        resolve(result);
                    }else{
                        result='undefined';
                        resolve(result);
                    }
                }
            });
        });
    }).catch(err=>{
        console.log(err)
    });
};

/**
 *@description 修改一条数据
  @param 同abAdd
 */
let dbUpdate = (sql,req) => {
    return new Promise((resolve, reject) => {
        let paramValue = paramList(req);
        pool.getConnection((err, conn) => {
            conn.query(sql, [...paramValue], (err, result) => {
                if(err){
                    reject(err)
                }else{
                    if (result.affectedRows > 0) {
                        result = "update";
                        resolve(result);
                    } else {
                        result = 'undefined'
                        resolve(result);
                    }
                }
                conn.release();
            });
        });
    }).catch(err=>{
       console.log(err)
    })
    
};

/**
 *@description 查找一条数据
  @param 同abAdd
 */
let dbfind = (sql,req) => {
    return new Promise((resolve, reject) => {
        let paramValue = paramList(req);
        pool.getConnection((err, conn) => {
            conn.query(sql, [...paramValue], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    if (result != "") {
                        res = {
                            result: "select",
                            data: result,
                        };
                        resolve(res)
                    } else {
                        res = 'undefined'
                        resolve(res)
                    }
                }
                conn.release();
            });
        });
    }).catch(err=>{
        reject(err)
    })
};

/**
 *@description 查找全部数据
  @param 同abAdd
 */
let dbQueryAll = (table, req, res, next) => {
    pool.getConnection((err, conn) => {
        conn.query(sql[table].queryAll, (err, result) => {
            if (result != "") {
                var _result = result;
                result = {
                    result: "selectall",
                    data: _result,
                };
            } else {
                result = undefined;
            }
            json(res, result, err);
            conn.release();
        });
    });
};

/**
 * @description 遍历数据的值
 * @param {obj} obj 包含参数的对象
 * */
let paramList = (obj) => {
    let paramArr = [];
    for (let key in obj) {
        if (obj[key]) {
            paramArr.push(obj[key]);
        }
    }
    return paramArr;
};

module.exports = {
    dbAdd,
    dbDelete,
    dbUpdate,
    dbfind,
    dbQueryAll,
};
// module.exports = {
//     SysqlConnect: function (sySql, sqlArr) {
//         return new Promise((resolve, reject) => {
//             var pool = mysql.createPool(this.config)
//             pool.getConnection((err, conn) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     //事件驱动回调
//                     conn.query(sySql, sqlArr, (err, data) => {
//                         if (err) {
//                             reject(err)
//                         } else {
//                             resolve(data)
//                         }
//                     });
//                 }
//                 //释放链接
//                 conn.release();
//             })
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }