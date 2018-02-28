const { generateToken, decodeToken } = require('../token');

module.exports = async (ctx, next) => {
  ctx.request.system = false;

  let token = null;
  token = ctx.request.get('authorization');

  // 토큰이 없다면 Skip
  if(!token) {
    return next();
  }

  try {
    const decoded = await decodeToken(token);
    console.log(decoded);
  } catch (e) {
    ctx.request.system = false;
  }

  return next();
};
