const Router = require('koa-router')
const remindersCtrl = require('./reminders.ctrl')

const reminders = new Router()

reminders.get('/', remindersCtrl.list)
reminders.post('/', remindersCtrl.write)
reminders.delete('/:id', remindersCtrl.remove)

module.exports = reminders