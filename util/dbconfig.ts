import {createPool} from 'mysql';
import $mysqlConfig from "./mysqlConfig";
const pool = createPool($mysqlConfig);
/**
 * @description 新增一条数据
 * @param  {str} sql sql语句
 * @param  {obj} req 插入的数据
 */
export const dbAdd = (sql:string, req:Record<string,unknown>) => {
    return new Promise((resolve,reject)=>{
        let paramValue = paramList(req);
        pool.getConnection((_err,conn)=>{
            conn.query(sql,[...paramValue],(_err_1,result)=>{
                if(_err_1){
                    reject(_err_1);
                }else{
                    if(result){
                        let res='add';
                        resolve(res);
                    }
                };
                conn.release();
            })
        });
    }).catch(_err_2=>{
        console.log(_err_2);
    });
};

/**
 *@description 删除一条数据
  @param 同abAdd
 */
export const dbDelete = (sql:string, req:Record<string,unknown>) => {
    return new Promise((resolve,reject)=>{
        let paramValue=paramList(req);
        pool.getConnection((_err,conn)=>{
            conn.query(sql,[...paramValue],(_err_1,result)=>{
                if(_err_1){
                    reject(_err_1)
                }else{
                    if(result.affectedRows>0){
                        let res='delete';
                        resolve(res);
                    }else{
                        let res='undefined';
                        resolve(res);
                    }
                };
                conn.release();
            });
        });
    }).catch(_err_2=>{
        console.log(_err_2);
    });
};

/**
 *@description 修改一条数据
  @param 同abAdd
 */
export const dbUpdate = (sql:string,req:Record<string,unknown>) => {
    return new Promise((resolve, reject) => {
        let paramValue = paramList(req);
        pool.getConnection((_err, conn) => {
            conn.query(sql, [...paramValue], (err, result) => {
                if(err){
                    reject(err)
                }else{
                    if (result.affectedRows > 0) {
                        let res:string = "update";
                        resolve(res);
                    } else {
                        let res:string = 'undefined'
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
export const dbfind = (sql:string,req:Record<string,unknown>) => {
    return new Promise((resolve, reject) => {
        let paramValue = paramList(req);
        pool.getConnection((_err, conn) => {
            conn.query(sql, [...paramValue], (_err_1, result) => {
                if (_err_1) {
                    reject(_err_1);
                } else {
                    if (result != "") {
                        let res = {
                            result: "select",
                            data: result,
                        };
                        resolve(res)
                    } else {
                        let res={
                            result:'undefined'
                        } 
                        resolve(res)
                    }
                };
                conn.release();
            });
        });
    }).catch(_err_2=>{
        console.log(_err_2)
    });
};

/**
 *@description 查找全部数据
  @param 同abAdd
 */
export const dbfindAll = (sql:string) => {
    return new Promise((resolve,reject)=>{
        pool.getConnection((_err,conn)=>{
            conn.query(sql,(_err_1,result)=>{
                if(_err_1){
                    reject(_err_1);
                }else{
                    if (result != "") {
                        let res = {
                            result: "selectall",
                            data: result,
                        };
                        resolve(res)
                    } else {
                        let res={
                            result:'undefined'
                        }
                        resolve(res)
                    }
                };
                conn.release();
            })
        })
    }).catch(_err_2=>{
        console.log(_err_2);
    });
};

/**
 * @description 遍历数据的值
 * @param {Record<string,unknown>} obj 包含参数的对象
 * */
let paramList = (obj:Record<string,unknown>) => {
    let paramArr = [];
    for (let key in obj) {
        if (obj[key]) {
            paramArr.push(obj[key]);
        }
    }
    return paramArr;
};

// module.exports = {
//     dbAdd,
//     dbDelete,
//     dbUpdate,
//     dbfind,
//     dbfindAll,
// };