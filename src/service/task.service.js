const connection = require('../app/database')
class TaskService {
    async tasklist(page, size, searchValue) {
        const pages = (page - 1) * size + ''
        const sizes = size + ''
        let statement
        let total
        if (!searchValue) {
            statement = `SELECT *
             FROM mission  WHERE missionstate = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM mission WHERE missionstate = 1`
        } else {
            statement = `SELECT *
             FROM mission  WHERE content LIKE '%${searchValue}%' AND missionstate = 1 ORDER BY id DESC LIMIT ?,?`
            total = `SELECT COUNT(*) AS count FROM mission WHERE content LIKE '%${searchValue}%' AND missionstate = 1`
        }
        const [result] = await connection.execute(statement, [pages, sizes])
        const [counts] = await connection.execute(total)
        const count = counts[0]
        return { result, ...count }
    }
    async taskdelete(id) {
        const satatement = ` UPDATE mission SET missionstate = 0 WHERE id = ?`
        const [result] = await connection.execute(satatement, [id])
        return result
    }
    async taskincrease(data) {
        const statement = `INSERT INTO mission (outset,end,content,remark,school,creator,receiver,type,sum) VALUES (?,?,?,?,?,?,?,?,?)`
        const [result] = await connection.execute(statement, Object.values(data))
        return result
    }
    async taskupdata(id, outset, end, content, remark, school, creator, receiver, type, sum) {
        const statement = `UPDATE mission SET outset = ?,end = ?,content = ?,remark = ?, school = ?,creator = ?,receiver = ?,type = ?,sum = ? WHERE id = ?`
        const [result] = await connection.execute(statement, [outset, end, content, remark, school, creator, receiver, type, sum, id])
        return result
    }
    async typelist() {
        const statement = `SELECT id,name FROM tasktype`
        const [result] = await connection.execute(statement)
        return result
    }
}

module.exports = new TaskService()
