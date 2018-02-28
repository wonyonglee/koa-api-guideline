module.exports = (ctx, next) => {
  const { system } = ctx.request;
  if(!system) {
    ctx.status = 401; // Unauthorized
    ctx.body = {
      error: 'Unauthorized'
    };
    return null;
  }
  return next();
};
