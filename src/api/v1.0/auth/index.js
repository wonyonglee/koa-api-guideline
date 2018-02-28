const Router = require('koa-router');

const auth = new Router();
const authService = require('./auth.service');
const needAuthSystem = require('lib/middlewares/needAuthSystem');

auth.post('/email', authService.checkEmail); // 이메일관련 정합성체크 진행

module.exports = auth;
