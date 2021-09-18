/**
 * Created by Walker on 2020/05/06.
 * 对操作不同表，sql语句的封装
 */
let login = {
    insert: "INSERT INTO test(id, name, age) VALUES(?,?,?)",
    update: "UPDATE test SET name=?, age=? WHERE id=?",
    delete: "DELETE FROM test WHERE id=?",
    phone: "select * from login where phone=?",
    queryAll: "SELECT * FROM test",
};
let teacher = {
    insert: "INSERT INTO teacher(id, name) VALUES(?,?)",
    update: "UPDATE teacher SET name=? WHERE id=?",
    delete: "DELETE FROM teacher WHERE id=?",
    queryById: "SELECT * FROM teacher WHERE id=?",
    queryAll: "SELECT * FROM teacher",
};
module.exports={
    login,
}
