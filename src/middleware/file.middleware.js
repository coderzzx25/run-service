const multer = require('koa-multer')

//用户头像
const head = multer({
    dest: './uploads/head',
})

const headHandler = head.single('head')

module.exports = { headHandler }
