const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const loginService = require('../service/login.service')

class loginController {
    // 用户登录
    async userLogin(ctx, next) {
        // 携带token输出
        const { id, nickname } = ctx.user
        const token = jwt.sign({ id, nickname }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256',
        })
        ctx.body = {
            code: 200,
            msg: '登录成功',
            data: {
                id,
                nickname,
                token,
            },
        }
    }
    // 验证token
    async success(ctx, next) {
        ctx.body = {
            code: 200,
            msg: '授权成功',
        }
    }
    //获取用户信息
    async userInfo(ctx, next) {
        const { id } = ctx.params
        const result = await loginService.userInfo(id)
        if (result) {
            ctx.body = {
                code: 200,
                msg: '获取成功',
                data: result,
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '获取失败',
            }
        }
    }
    //获取用户菜单
    async userMenu(ctx, next) {
        const result = ctx.menu
        if (result !== null) {
            if (result) {
                ctx.body = {
                    code: 200,
                    msg: '获取成功',
                    data: result,
                }
            } else {
                ctx.body = {
                    code: 400,
                    msg: '获取失败',
                }
            }
        }
    }
}
module.exports = new loginController()
