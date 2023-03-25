const loginService = require('../service/login.service')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')
const md5password = require('../utils/password-handle')

// 用户登录信息验证
const verifyLogin = async (ctx, next) => {
    // 验证用户是否输入
    const { name, password } = ctx.request.body
    if (!name || !password) {
        const error = { code: 400, msg: '用户名或密码不能为空' }
        return (ctx.body = error)
    }
    // 发送请求验证
    const result = await loginService.verifyName(name)
    const user = result[0]
    if (!user) {
        const error = { code: 400, msg: '该用户不存在' }
        return (ctx.body = error)
    }

    // 判断密码是否正确
    if (md5password(password) !== user.password) {
        const error = { code: 400, msg: '用户名或密码错误' }
        return (ctx.body = error)
    }
    // 将查询到的用户数据存入ctx
    ctx.user = user
    await next()
}
// 验证token
const verifyToken = async (ctx, next) => {
    // 获取token
    const authorization = ctx.headers.authorization
    // console.log(authorization);
    if (!authorization) {
        const error = { code: 401, msg: '无效token' }
        return (ctx.body = error)
    }
    const token = authorization.replace('Bearer ', '')
    // 验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256'],
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = { code: 401, msg: '无效token' }
        ctx.body = error
    }
}

//获取用户菜单
const menuInfo = async (ctx, next) => {
    const { id } = ctx.params
    const power = await loginService.userMenu(id)
    const menu = JSON.parse(power.role)
    let level_one = []
    let level_two = []
    for (let index = 0; index < menu.length; index++) {
        const menuId = menu[index]
        const menuItem = await loginService.menuInfo(menuId)
        if (menuItem.sort === null) {
            menuItem.children = []
            level_one.push(menuItem)
        } else {
            level_two.push(menuItem)
        }
    }
    level_one.forEach((one) => {
        level_two.forEach((two) => {
            if (one.id === two.sort) {
                one.children.push(two)
            }
        })
    })
    ctx.menu = level_one
    await next()
}

module.exports = { verifyLogin, verifyToken, menuInfo }
