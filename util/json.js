/**
 * Created by Walker on 2020/05/06.
 * 消息请求响应
 */
//封装接送模块
var json = function (res, result, err) {
    if (typeof result === "undefined") {
        res.json({
            code: "300",
            msg: "操作失败:" + err,
        });
    } else if (result === "add") {
        res.json({
            code: "200",
            msg: "添加成功",
        });
    } else if (result === "delete") {
        res.json({
            code: "200",
            msg: "删除成功",
        });
    } else if (result === "update") {
        res.json({
            code: "200",
            msg: "更改成功",
        });
    } else if (result.result != "undefined" && result.result === "select") {
        res.json({
            code: "200",
            msg: "查找成功",
            data: result.data,
        });
    } else if (result.result != "undefined" && result.result === "selectall") {
        res.json({
            code: "200",
            msg: "全部查找成功",
            data: result.data,
        });
    } else {
        res.json(result);
    }
};
module.exports = json;