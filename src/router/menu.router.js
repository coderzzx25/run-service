const Router = require('koa-router')

const menuRouter = new Router({ prefix: '/menu' })

const { verifyToken } = require('../middleware/login.middleware')

const { list, menulist, menudelete, menuincrease, menuupdata, firstmenu } = require('../controller/menu.controller')

//get菜单列表
menuRouter.get('/list', list)
// 菜单列表
menuRouter.post('/menulist', verifyToken, menulist)
//菜单删除
menuRouter.delete('/menudelete/:id', verifyToken, menudelete)
//菜单添加
menuRouter.post('/menuincrease', verifyToken, menuincrease)
//菜单修改
menuRouter.post('/menuupdata', verifyToken, menuupdata)
//一级菜单
menuRouter.get('/firstmenu', verifyToken, firstmenu)

module.exports = menuRouter
