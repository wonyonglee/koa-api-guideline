const Mail = require('db/models/Mail');
const mailer = require('lib/mailer');

async function emailScheduler() {
  try {
    const data = await Mail.findNoSendEmails();

    data.forEach(async function(mailInfo) {
      await mailer.sendMail({ to: 'wonyong@onionground.com', authToken: mailInfo.authToken });
      await Mail.sendMailComplete(mailInfo._id);
      global.logger.debug(mailInfo._id);
    });
  } catch (e) {
    global.logger.error(e);
  }

  global.logger.debug('emailScheduler Processing...');
}

module.exports = emailScheduler;
