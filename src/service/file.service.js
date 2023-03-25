const connection = require('../app/database')

class FileService {
    async createFile(filename, mimetype, size) {
        const statement = `INSERT INTO file (filename, mimetype, size) VALUES (?, ?, ?)`
        const [result] = await connection.execute(statement, [filename, mimetype, size])
        return result
    }
    async getFileByFilename(filename) {
        const statement = `SELECT * FROM file WHERE filename = ?`
        const [result] = await connection.execute(statement, [filename])
        return result[0]
    }
}

module.exports = new FileService()
