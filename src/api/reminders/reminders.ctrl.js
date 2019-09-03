const Reminder = require('models/reminder')
const Joi = require('joi')

const { ObjectId } = require('mongoose').Types

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params
    
    if(!ObjectId.isValid(id)) {
        ctx.status = 400;
        return null
    }

    return next();
}

exports.list = async (ctx) => {

    console.log('exports.list 접속');

    const {year, month} = ctx.request.query;
    
    try{
        const reminders = await Reminder.find({"year":{$eq: year}, "month": {$eq: month}}).exec()
        ctx.body = reminders
    }
    catch(e) {
        ctx.throw(e, 500)
    }
}

// exports.read = async (ctx) => {
//     try{
//         console.log(ctx.query);

//         const reminders = await Reminder.findById().exec()
//         ctx.body = reminders
//     }
//     catch(e) {
//         ctx.throw(e, 500)
//     }
// }

exports.write = async (ctx) => {

    console.log('exports.write 접속');

    const schema = Joi.object().keys({
        year: Joi.number().required(),
        month: Joi.number().required(),
        dayNum: Joi.number().required(),
        discription: Joi.string().required(),
    })

    console.log('#ctx body',);
    

    const result = Joi.validate(ctx.request.body, schema)

    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {year, month, dayNum, discription} = ctx.request.body

    const reminder = new Reminder({
        year, month, dayNum, discription
    })

    try {
        await reminder.save()
        ctx.body = reminder
    }
    catch(e) {
        ctx.throw(e, 500)
    }
}

exports.remove = async (ctx) => {
    const { id } = ctx.params

    try {
        await Reminder.findByIdAndRemove(id).exec();
        ctx.status = 204
    }
    catch(e) {
        ctx.throw(e, 500)
    }
}