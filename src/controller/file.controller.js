const fs = require('fs')
const fileService = require('../service/file.service')
class FileController {
    async uploadHead(ctx, next) {
        const { mimetype, filename, size } = ctx.req.file
        const result = await fileService.createFile(filename, mimetype, size)
        const url = `http://localhost:8888/uploads/head/${filename}`
        if (result) {
            ctx.body = {
                code: 200,
                msg: '上传图片成功',
                data: url,
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '上传图片失败',
            }
        }
    }

    async fileecho(ctx, next) {
        const { filename } = ctx.params
        const result = await fileService.getFileByFilename(filename)
        // const { mimetype } = result
        ctx.response.set('content-type', result.mimetype)
        ctx.body = fs.createReadStream(`./uploads/head/${filename}`)
    }
}

module.exports = new FileController()
