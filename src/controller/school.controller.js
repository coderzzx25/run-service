const schoolService = require('../service/school.service')
class SchoolController {
    async list(ctx, next) {
        const result = await schoolService.list()
        if (result) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                result,
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '查询失败',
            }
        }
    }
    async schoollist(ctx, next) {
        const { page, size, searchValue } = ctx.request.body
        const { result, count } = await schoolService.schoollist(page, size, searchValue)
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
    async schooldelete(ctx, next) {
        const { id } = ctx.params
        const result = await schoolService.schooldelete(id)
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
    async schoolincrease(ctx, next) {
        const result = await schoolService.schoolincrease(ctx.request.body)
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
    async schoolupdata(ctx, next) {
        const { id, name } = ctx.request.body
        const result = await schoolService.schoolupdata(id, name)
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

module.exports = new SchoolController()
