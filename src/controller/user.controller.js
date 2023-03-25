const userService = require('../service/user.service')
class UserController {
    async list(ctx, next) {
        const result = await userService.list()
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
    async userlist(ctx, next) {
        const { page, size, searchValue } = ctx.request.body
        const { result, count } = await userService.userlist(page, size, searchValue)
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
    async userdelete(ctx, next) {
        const { id } = ctx.params
        const result = await userService.userdelete(id)
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
    async userincrease(ctx, next) {
        const result = await userService.userincrease(ctx.request.body)
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
    async userupdata(ctx, next) {
        const { id, name, nickname, head, school, power } = ctx.request.body
        const result = await userService.userupdata(id, name, nickname, head, school, power)
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

module.exports = new UserController()
