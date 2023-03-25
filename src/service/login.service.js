const connection = require('../app/database')

class loginService {
    // 验证
    async verifyName(name) {
        const statement = `SELECT id,nickname,password FROM user WHERE name = ?`
        const result = await connection.execute(statement, [name])
        return result[0]
    }
    //获取用户信息
    async userInfo(id) {
        const statement = `SELECT u.id,u.name,u.nickname,u.head,u.power,(SELECT JSON_OBJECT('id',s.id,'name',s.name) FROM school s WHERE u.school = s.id) school FROM user u WHERE u.id = ?`
        const [result] = await connection.execute(statement, [id])
        return result[0]
    }
    //获取用户权限
    async userMenu(id) {
        const statement = `SELECT id,name,role FROM usertype WHERE id = ?`
        const [result] = await connection.execute(statement, [id])
        return result[0]
    }
    async menuInfo(id) {
        const statement = `SELECT id,name,url,type,icon,sort FROM menu WHERE id = ?`
        const [result] = await connection.execute(statement, [id])
        return result[0]
    }
}
module.exports = new loginService()
