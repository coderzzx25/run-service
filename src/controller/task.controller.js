const taskService = require('../service/task.service')
class TaskController {
    async tasklist(ctx, next) {
        const { page, size, searchValue } = ctx.request.body
        const { result, count } = await taskService.tasklist(page, size, searchValue)
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
    async taskdelete(ctx, next) {
        const { id } = ctx.params
        const result = await taskService.taskdelete(id)
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
    async taskincrease(ctx, next) {
        const result = await taskService.taskincrease(ctx.request.body)
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
    async taskupdata(ctx, next) {
        const { id, outset, end, content, remark, school, creator, receiver, type, sum } = ctx.request.body
        const result = await taskService.taskupdata(id, outset, end, content, remark, school, creator, receiver, type, sum)
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
    async typelist(ctx, next) {
        const result = await taskService.typelist()
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
}

module.exports = new TaskController()
