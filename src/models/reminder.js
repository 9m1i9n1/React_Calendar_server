const mongoose = require('mongoose')

const { Schema } = mongoose

const Reminder = new Schema({
    year: Number,
    month: Number,
    dayNum: Number,
    discription: String
})

module.exports = mongoose.model('Reminder', Reminder)