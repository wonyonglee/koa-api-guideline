// Allow Header 셋팅
module.exports = async (ctx, next) => {
  const allowedHosts = [
    'localhost',
    'zuly.co.kr'

  ];
  const origin = ctx.header['origin'];
  allowedHosts.every(el => {
    if(!origin) return false;
    if(origin.indexOf(el) !== -1) {
      ctx.response.set('Access-Control-Allow-Origin', origin);
      return false;
    }
    return true;
  });
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-timebase, Link');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  ctx.set('Access-Control-Expose-Headers', 'Link');
  return next();
};
