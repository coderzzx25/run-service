const connection = require('../app/database')
class SchoolService {
    async list() {
        const statement = `SELECT * FROM school`
        const [result] = await connection.execute(statement)
        return result
    }
    async schoollist(page, size, searchValue) {
        const pages = (page - 1) * size + ''
        const sizes = size + ''
        let statement
        let total
        if (!searchValue) {
            statement = `SELECT *
             FROM school  WHERE state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM school WHERE state = 1`
        } else {
            statement = `SELECT *
             FROM school  WHERE name LIKE '%${searchValue}%' AND state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM school WHERE name LIKE '%${searchValue}%' AND state = 1`
        }
        const [result] = await connection.execute(statement, [pages, sizes])
        const [counts] = await connection.execute(total)
        const count = counts[0]
        return { result, ...count }
    }
    async schooldelete(id) {
        const satatement = ` UPDATE school SET state = 0 WHERE id = ?`
        const [result] = await connection.execute(satatement, [id])
        return result
    }
    async schoolincrease(data) {
        const statement = `INSERT INTO school (name) VALUES (?)`
        const [result] = await connection.execute(statement, Object.values(data))
        return result
    }
    async schoolupdata(id, name) {
        const statement = `UPDATE school SET name = ? WHERE id = ?`
        const [result] = await connection.execute(statement, [name, id])
        return result
    }
}

module.exports = new SchoolService()
