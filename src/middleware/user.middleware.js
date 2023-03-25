const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

const VerifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body
    if (!name || !password) {
        return (ctx.body = {
            code: 400,
            msg: '用户名或密码不能为空',
        })
    }
    const result = await userService.VerifyName(name)
    if (result.length) {
        return (ctx.body = {
            code: 409,
            msg: '用户名已存在',
        })
    }
    await next()
}
// 对密码进行加密
const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body
    ctx.request.body.password = md5password(password)

    await next()
}

module.exports = {
    VerifyUser,
    handlePassword,
}
