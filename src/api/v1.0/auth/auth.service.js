const Joi = require('joi');
const Mail = require('db/models/Mail');

const SET_AUTH_EMAIL = 'EM01';

// 이메일관련 정합성체크
exports.checkEmail = async (ctx) => {
  const { body } = ctx.request;
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const result = Joi.validate(body, schema);

  if(result.error) {
    ctx.status = 400;
    ctx.body = {
      result: false,
      errorMessage: 'Bad Request'
    };
    return;
  }

  const { email } = body;

  try {
    const authToken = await Mail.generateToken(email);
    global.logger.debug(authToken);
    const user = await Mail.setMailInfo({
      useType: SET_AUTH_EMAIL, email, authToken,
    });
    global.logger.debug(user);
    ctx.body = {
      result: true
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
};
