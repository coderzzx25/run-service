const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

const { verifyToken } = require('../middleware/login.middleware')

const { list, userlist, userdelete, userincrease, userupdata } = require('../controller/user.controller')

const { VerifyUser, handlePassword } = require('../middleware/user.middleware')

userRouter.get('/list', verifyToken, list)

//用户列表
userRouter.post('/userlist', verifyToken, userlist)
//用户删除
userRouter.delete('/userdelete/:id', verifyToken, userdelete)
//用户添加
userRouter.post('/userincrease', verifyToken, VerifyUser, handlePassword, userincrease)
//用户修改
userRouter.post('/userupdata', verifyToken, userupdata)

module.exports = userRouter
