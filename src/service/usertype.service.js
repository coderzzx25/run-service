const connection = require('../app/database')
class UsertypeService {
    async list() {
        const statement = `SELECT id,name FROM usertype`
        const [result] = await connection.execute(statement)
        return result
    }

    async usertypelist(page, size, searchValue) {
        const pages = (page - 1) * size + ''
        const sizes = size + ''
        let statement
        let total
        if (!searchValue) {
            statement = `SELECT *
         FROM usertype  WHERE state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM usertype WHERE state = 1`
        } else {
            statement = `SELECT *
         FROM usertype  WHERE name LIKE '%${searchValue}%' AND state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM usertype WHERE name LIKE '%${searchValue}%' AND state = 1`
        }
        const [result] = await connection.execute(statement, [pages, sizes])
        const [counts] = await connection.execute(total)
        const count = counts[0]
        return { result, ...count }
    }
    async menuList() {
        const statement = `SELECT * FROM menu`
        const [result] = await connection.execute(statement)
        return result
    }
    async usertypeincrease(name, role) {
        const statement = `INSERT INTO usertype (name,role) VALUES (?,?)`
        const [result] = await connection.execute(statement, [name, role])
        return result
    }
    async usertypeupdata(id, name, role) {
        const statement = `UPDATE usertype SET name = ?,role = ? WHERE id = ?`
        const [result] = await connection.execute(statement, [name, role, id])
        return result
    }
    async usertypedelete(id) {
        const statement = `UPDATE usertype SET state = 0 WHERE id = ?`
        const [result] = await connection.execute(statement, [id])
        return result
    }
}

module.exports = new UsertypeService()
