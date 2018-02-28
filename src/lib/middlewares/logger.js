const log4js = require('log4js');
const logger = log4js.getLogger();
const { LOG_LEVEL: logLevel } = process.env;
logger.level = logLevel;

// logger (log4js) 셋팅
module.exports = async (ctx, next) => {
  global.logger = logger;
  return next();
};
