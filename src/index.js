require('dotenv').config()

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI
} = process.env

const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI)
.then(() => {
    console.log('connected to mongodb');
})
.catch((e) => {
    console.error(e);
})

// api 라우터 불러오기
const api = require('./api')

const app = new Koa();
const router = new Router();

app.use(cors());
// api 라우트
router.use('/api', api.routes())

// //! 라우터 적용 전에 bodyParser 적용
app.use(bodyParser())

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
    console.log('listening to port ', port);
})