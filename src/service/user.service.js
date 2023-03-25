const connection = require('../app/database')
class UserService {
    async list() {
        const statement = `SELECT id,name FROM user`
        const [result] = await connection.execute(statement)
        return result
    }
    async userlist(page, size, searchValue) {
        const pages = (page - 1) * size + ''
        const sizes = size + ''
        let statement
        let total
        if (!searchValue) {
            statement = `SELECT *
         FROM user  WHERE state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM user WHERE state = 1`
        } else {
            statement = `SELECT *
         FROM user  WHERE name LIKE '%${searchValue}%' AND state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM user WHERE name LIKE '%${searchValue}%' AND state = 1`
        }
        const [result] = await connection.execute(statement, [pages, sizes])
        const [counts] = await connection.execute(total)
        const count = counts[0]
        return { result, ...count }
    }
    async userdelete(id) {
        const satatement = ` UPDATE user SET state = 0 WHERE id = ?`
        const [result] = await connection.execute(satatement, [id])
        return result
    }
    async userincrease(data) {
        const statement = `INSERT INTO user (name,nickname,password,head,school,power) VALUES (?,?,?,?,?,?)`
        const [result] = await connection.execute(statement, Object.values(data))
        return result
    }
    async userupdata(id, name, nickname, head, school, power) {
        const statement = `UPDATE user SET name = ?,nickname = ?,head = ?,school=?,power=? WHERE id = ?`
        const [result] = await connection.execute(statement, [name, nickname, head, school, power, id])
        return result
    }
    async VerifyName(name) {
        const statement = `SELECT * FROM user WHERE name = ?`
        const [result] = await connection.execute(statement, [name])
        return result
    }
}

module.exports = new UserService()
