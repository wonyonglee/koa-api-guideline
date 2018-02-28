const mongoose = require('mongoose');
const { Schema } = mongoose;
const token = require('lib/token');

const Mail = new Schema({
  useType: String,
  email: String,
  authToken: String,
  isAuth: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  sendAuthAt: {
    type: Date
  }
});

Mail.statics.setMailInfo = async function({ useType, email, authToken }) {
  const user = new this({
    useType,
    email,
    authToken
  });
  user.isAuth = false;
  return user.save();
};

Mail.statics.sendMailComplete = async function(_id) {
  return this.findOneAndUpdate({ _id }, {
    isAuth: true,
    lastUpdated: new Date()
  }, { upsert: false, new: true }).exec();
};

Mail.statics.findNoSendEmails = function(userId, cursor, currencyPair, status) {
  return this.find({
    isAuth: false
  }).sort({
    createdAt: -1
  }).limit(20).exec();
};

Mail.statics.generateToken = function(email) {
  return token.generateToken({
    user: {
      email: email,
    }
  }, 'checkemail');
};

module.exports = mongoose.model('Mail', Mail);
