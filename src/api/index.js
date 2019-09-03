const Router = require('koa-router')
const reminders = require('./reminders')

const api = new Router()

api.use('/reminders', reminders.routes())

module.exports = api