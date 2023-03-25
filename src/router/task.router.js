const Router = require('koa-router')

const taskRouter = new Router({ prefix: '/task' })

const { verifyToken } = require('../middleware/login.middleware')

const { tasklist, taskdelete, taskincrease, taskupdata, typelist } = require('../controller/task.controller')

//任务列表
taskRouter.post('/tasklist', verifyToken, tasklist)
//任务删除
taskRouter.delete('/taskdelete/:id', verifyToken, taskdelete)
//任务添加
taskRouter.post('/taskincrease', verifyToken, taskincrease)
//任务修改
taskRouter.post('/taskupdata', verifyToken, taskupdata)
//任务类型
taskRouter.get('/typelist', verifyToken, typelist)

module.exports = taskRouter
