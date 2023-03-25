const Router = require('koa-router')

const usertypeRouter = new Router({ prefix: '/usertype' })

const { verifyToken } = require('../middleware/login.middleware')

const { list, usertypelist, usertypedelete, usertypeincrease, usertypeupdata } = require('../controller/usertype.controller')

usertypeRouter.get('/list', verifyToken, list)

//用户类型列表
usertypeRouter.post('/usertypelist', verifyToken, usertypelist)
//用户类型删除
usertypeRouter.delete('/usertypedelete/:id', verifyToken, usertypedelete)
//用户类型添加
usertypeRouter.post('/usertypeincrease', verifyToken, usertypeincrease)
//用户类型修改
usertypeRouter.post('/usertypeupdata', verifyToken, usertypeupdata)

module.exports = usertypeRouter
