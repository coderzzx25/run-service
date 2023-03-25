const connection = require('../app/database')
class DataService {
    async tasktype() {
        const statement = `SELECT id,name FROM tasktype WHERE state = 1`
        const [result] = await connection.execute(statement)
        return result
    }
    async task(id) {
        const statement = `SELECT COUNT(*) FROM mission WHERE type = ? AND state = 1`
        const [result] = await connection.execute(statement, [id])
        return result
    }
}

module.exports = new DataService()
