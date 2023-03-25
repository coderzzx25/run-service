const connection = require('../app/database')
class MenuService {
    async list() {
        const statement = `SELECT * FROM menu`
        const [result] = await connection.execute(statement)
        return result
    }
    async menulist(page, size, searchValue) {
        const pages = (page - 1) * size + ''
        const sizes = size + ''
        let statement
        let total
        if (!searchValue) {
            statement = `SELECT *
             FROM menu  WHERE state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM menu WHERE state = 1`
        } else {
            statement = `SELECT *
             FROM menu  WHERE name LIKE '%${searchValue}%' AND state = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM menu WHERE name LIKE '%${searchValue}%' AND state = 1`
        }
        const [result] = await connection.execute(statement, [pages, sizes])
        const [counts] = await connection.execute(total)
        const count = counts[0]
        return { result, ...count }
    }
    async menudelete(id) {
        const satatement = ` UPDATE menu SET state = 0 WHERE id = ?`
        const [result] = await connection.execute(satatement, [id])
        return result
    }
    async menuincrease(data) {
        const statement = `INSERT INTO menu (name,url,type,icon,sort) VALUES (?,?,?,?,?)`
        const [result] = await connection.execute(statement, Object.values(data))
        return result
    }
    async menuupdata(id, name, url, type, icon, sort) {
        const statement = `UPDATE menu SET name = ?,url = ?,type = ?,icon = ?, sort = ? WHERE id = ?`
        const [result] = await connection.execute(statement, [name, url, type, icon, sort, id])
        return result
    }
    async firstmenu() {
        const statement = `SELECT * FROM menu WHERE type = 1 AND state = 1`
        const [result] = await connection.execute(statement)
        return result
    }
}
module.exports = new MenuService()
