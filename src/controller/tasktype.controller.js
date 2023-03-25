const tasktypeService = require('../service/tasktype.service')
class TasktypeController {
    async tasktypelist(ctx, next) {
        const { page, size, searchValue } = ctx.request.body
        const { result, count } = await tasktypeService.tasktypelist(page, size, searchValue)
        if (result) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                count,
                result,
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '查询失败',
            }
        }
    }
    async tasktypedelete(ctx, next) {
        const { id } = ctx.params
        const result = await tasktypeService.tasktypedelete(id)
        if (result) {
            ctx.body = {
                code: 200,
                msg: '删除成功',
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '删除失败',
            }
        }
    }
    async tasktypeincrease(ctx, next) {
        const result = await tasktypeService.tasktypeincrease(ctx.request.body)
        if (result) {
            ctx.body = {
                code: 200,
                msg: '添加成功',
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '添加失败',
            }
        }
    }
    async tasktypeupdata(ctx, next) {
        const { id, name, icon, url } = ctx.request.body
        const result = await tasktypeService.tasktypeupdata(id, name, icon, url)
        if (result) {
            ctx.body = {
                code: 200,
                msg: '添加成功',
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '添加失败',
            }
        }
    }
}

module.exports = new TasktypeController()
