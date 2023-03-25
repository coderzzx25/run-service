const dataService = require('../service/data.service.js')
class DataController {
    async tasktypedata(ctx, next) {
        const task = await dataService.tasktype()
        const result = []
        for (let i = 0; i < task.length; i++) {
            const data = await dataService.task(task[i].id)
            result.push({
                name: task[i].name,
                value: data[0]['COUNT(*)'],
            })
        }
        if (result.length > 0) {
            ctx.body = {
                code: 200,
                msg: '获取成功',
                result,
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '获取失败',
            }
        }
    }
}
module.exports = new DataController()
