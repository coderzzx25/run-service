const Router = require('koa-router')

const fileRouter = new Router({ prefix: '/uploads' })

const { headHandler } = require('../middleware/file.middleware')

const { uploadHead, fileecho } = require('../controller/file.controller')

//用户头像上传
fileRouter.post('/head', headHandler, uploadHead)

//图片回显
fileRouter.get('/head/:filename', fileecho)

module.exports = fileRouter
