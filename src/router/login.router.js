const Router = require('koa-router')

const loginRouter = new Router({ prefix: '/login' })

const { userLogin, success, userInfo, userMenu } = require('../controller/login.controller')

const { verifyLogin, verifyToken, menuInfo } = require('../middleware/login.middleware')
// 用户登录
loginRouter.post('/', verifyLogin, userLogin)
//获取用户信息
loginRouter.get('/users/:id', verifyToken, userInfo)
//获取用户菜单
loginRouter.get('/users/:id/menu', menuInfo, userMenu)
//验证token
loginRouter.get('/test', verifyToken, success)

module.exports = loginRouter
