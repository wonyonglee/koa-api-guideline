require('dotenv').config();
const {
  PORT: port,
} = process.env;

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const db = require('db');
const api = require('api');
const jwtMiddleware = require('lib/middlewares/jwt');
const allowHeader = require('lib/middlewares/allowheader');
const log4js = require('lib/middlewares/logger');

db.connect();
const app = new Koa();

// MiddleWares
app.use(log4js);
app.use(allowHeader);
app.use(jwtMiddleware);
app.use(bodyParser());

const router = new Router();
router.use('/api', api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`ZULY-ALRAM Server is listening to port ${port}`);
});
