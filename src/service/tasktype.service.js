const connection = require('../app/database')
const changeData = require('../utils/change-data')
class TasktypeService {
    async tasktypelist(page, size, searchValue) {
        const pages = (page - 1) * size + ''
        const sizes = size + ''
        let statement
        let total
        if (!searchValue) {
            statement = `SELECT *
         FROM tasktype  WHERE state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM tasktype WHERE state = 1`
        } else {
            statement = `SELECT *
         FROM tasktype  WHERE name LIKE '%${searchValue}%' AND state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM tasktype WHERE name LIKE '%${searchValue}%' AND state = 1`
        }
        const [result] = await connection.execute(statement, [pages, sizes])
        const [counts] = await connection.execute(total)
        const count = counts[0]
        return { result, ...count }
    }
    async tasktypedelete(id) {
        const satatement = ` UPDATE tasktype SET state = 0 WHERE id = ?`
        const [result] = await connection.execute(satatement, [id])
        return result
    }
    async tasktypeincrease(data) {
        const filterData = changeData(data)
        const statement = `INSERT INTO tasktype (name,icon,url) VALUES (?,?,?)`
        const [result] = await connection.execute(statement, Object.values(filterData))
        return result
    }
    async tasktypeupdata(id, name, icon, url) {
        console.log(id, name, icon, url)
        const statement = `UPDATE tasktype SET name = ?,icon = ?,url = ? WHERE id = ?`
        const [result] = await connection.execute(statement, [name, icon, url, id])
        return result
    }
}

module.exports = new TasktypeService()
