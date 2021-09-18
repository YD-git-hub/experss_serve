const mysql = require('mysql');
const $mysqlConfig = require('./mysqlConfig');
const pool = mysql.createPool($mysqlConfig);
/**
 * @description 新增一条数据
 * @param  {str} sql sql语句
 * @param  {obj} req 插入的数据
 */
let dbAdd = (sql, req) => {
    return new Promise((resolve,reject)=>{
        let paramValue = paramList(req);
        pool.getConnection((err,conn)=>{
            conn.query(sql,[...paramValue],(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    if(result){
                        res='add';
                        resolve(res);
                    }
                };
                conn.release();
            })
        });
    }).catch(err=>{
        console.log(err);
    });
};

/**
 *@description 删除一条数据
  @param 同abAdd
 */
let dbDelete = (sql, req) => {
    return new Promise((resolve,reject)=>{
        let paramValue=paramList(req);
        pool.getConnection((err,conn)=>{
            conn.query(sql,[...paramValue],(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    if(result.affectedRows>0){
                        res='delete';
                        resolve(res);
                    }else{
                        res='undefined';
                        resolve(res);
                    }
                };
                conn.release();
            });
        });
    }).catch(err=>{
        console.log(err);
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
                        res = "update";
                        resolve(res);
                    } else {
                        res = 'undefined'
                        resolve(res);
                    }
                };
                conn.release();
            });
        });
    }).catch(err=>{
        console.log(err);
    });
    
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
                    reject(err);
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
                };
                conn.release();
            });
        });
    }).catch(err=>{
        reject(err);
    });
};

/**
 *@description 查找全部数据
  @param 同abAdd
 */
let dbfindAll = (sql, req) => {
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    if (result != "") {
                        res = {
                            result: "selectall",
                            data: result,
                        };
                        resolve(res)
                    } else {
                        res = 'undefined';
                        resolve(res)
                    }
                };
                conn.release();
            })
        })
    }).catch(err=>{
        console.log(err);
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
    dbfindAll,
};