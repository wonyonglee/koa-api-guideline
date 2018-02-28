require('dotenv').config();
const { CronJob } = require('cron');
const db = require('db');
const log4js = require('log4js');
const logger = log4js.getLogger();
const { LOG_LEVEL: logLevel } = process.env;
logger.level = logLevel;

const emailScheduler = require('./emailScheduler');

function initialize() {
  db.connect();
  global.logger = logger;

  const emailJob = new CronJob({
    cronTime: '*/10 * * * * *',
    onTick: emailScheduler
  });

  emailJob.start();
}

initialize();
