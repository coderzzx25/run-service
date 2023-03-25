/**
 * @Author: zzxcoder
 * @Date: 2022-04-27 10:39:10
 * @LastEditTime: 2022-10-03 12:39:13
 * @LastEditors: zzxcoder
 * @Description: zzxcoder
 * @FilePath: /koa/src/app/index.js
 * @
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router')
const cors = require('@koa/cors')

const app = new Koa()

app.use(bodyParser())
app.use(cors())
useRoutes(app)

module.exports = app
