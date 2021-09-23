/**
 * Created by Walker on 2020/05/06.
 * 对操作不同表，sql语句的封装
 */
export let login:Record<string,unknown> = {
    insert: "INSERT INTO test(id, name, age) VALUES(?,?,?)",
    update: "UPDATE test SET name=?, age=? WHERE id=?",
    delete: "DELETE FROM test WHERE id=?",
    select_phone: "select * from login where phone=?",
    select_login: "select * from login where phone=? and user_password=?",
    queryAll: "SELECT * FROM test",
};