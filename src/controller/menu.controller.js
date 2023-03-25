const menuService = require('../service/menu.service')
const filterMenu = require('../utils/filter-menu')
class MenuController {
    async list(ctx, next) {
        const result = await menuService.list()
        if (result) {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                result: filterMenu(result),
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '查询失败',
            }
        }
    }
    async menulist(ctx, next) {
        const { page, size, searchValue } = ctx.request.body
        const { result, count } = await menuService.menulist(page, size, searchValue)
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
    async menudelete(ctx, next) {
        const { id } = ctx.params
        const result = await menuService.menudelete(id)
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
    async menuincrease(ctx, next) {
        const result = await menuService.menuincrease(ctx.request.body)
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
    async menuupdata(ctx, next) {
        const { id, name, url, type, icon, sort } = ctx.request.body
        const result = await menuService.menuupdata(id, name, url, type, icon, sort)
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
    async firstmenu(ctx, next) {
        const result = await menuService.firstmenu()
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
module.exports = new MenuController()
