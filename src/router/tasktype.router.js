const Router = require('koa-router')

const tasktypeRouter = new Router({ prefix: '/tasktype' })

const { verifyToken } = require('../middleware/login.middleware')

const { tasktypelist, tasktypedelete, tasktypeincrease, tasktypeupdata } = require('../controller/tasktype.controller')

//任务类型
tasktypeRouter.post('/tasktypelist', verifyToken, tasktypelist)
//任务删除
tasktypeRouter.delete('/tasktypedelete/:id', verifyToken, tasktypedelete)
//任务添加
tasktypeRouter.post('/tasktypeincrease', verifyToken, tasktypeincrease)
//任务修改
tasktypeRouter.post('/tasktypeupdata', verifyToken, tasktypeupdata)

module.exports = tasktypeRouter
