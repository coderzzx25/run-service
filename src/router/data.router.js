const Router = require('koa-router')

const dataRouter = new Router({ prefix: '/data' })

const { verifyToken } = require('../middleware/login.middleware')

const { tasktypedata } = require('../controller/data.controller.js')

//任务类型数量
dataRouter.get('/tasktypedata', verifyToken, tasktypedata)

module.exports = dataRouter
