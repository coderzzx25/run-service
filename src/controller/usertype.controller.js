const usertypeService = require('../service/usertype.service')
class UsertypeController {
    async list(ctx, next) {
        const result = await usertypeService.list()
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
    async usertypedelete(ctx, next) {
        const { id } = ctx.params
        const result = await usertypeService.usertypedelete(id)
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
    async usertypelist(ctx, next) {
        const { page, size, searchValue } = ctx.request.body
        const { result, count } = await usertypeService.usertypelist(page, size, searchValue)
        const menuList = result.map((item) => {
            item.role = JSON.parse(item.role)
            return item
        })
        if (result) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                count,
                result: menuList,
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '查询失败',
            }
        }
    }
    async usertypeincrease(ctx, next) {
        const { name, role } = ctx.request.body
        const result = await usertypeService.usertypeincrease(name, role)
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
    async usertypeupdata(ctx, next) {
        const { id, name, role } = ctx.request.body
        const result = await usertypeService.usertypeupdata(id, name, role)
        if (result) {
            ctx.body = {
                code: 200,
                msg: '修改成功',
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '修改失败',
            }
        }
    }
}

module.exports = new UsertypeController()
