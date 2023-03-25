const Router = require('koa-router')

const schoolRouter = new Router({ prefix: '/school' })

const { verifyToken } = require('../middleware/login.middleware')

const { list, schoollist, schooldelete, schoolincrease, schoolupdata } = require('../controller/school.controller')

//get学校列表
schoolRouter.get('/list', verifyToken, list)
//学校列表
schoolRouter.post('/schoollist', verifyToken, schoollist)
//学校删除
schoolRouter.delete('/schooldelete/:id', verifyToken, schooldelete)
//学校添加
schoolRouter.post('/schoolincrease', verifyToken, schoolincrease)
//学校修改
schoolRouter.post('/schoolupdata', verifyToken, schoolupdata)

module.exports = schoolRouter
