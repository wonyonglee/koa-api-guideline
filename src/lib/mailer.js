const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: 'admin@onionground.com',
        pass: '!Onion@Ground#O'
    }
});

const sendMail = async function({ to, authToken }) {
  let mailOptions = {
      from: 'ZULY <admin@onionground.com>',
      to: to,
      subject: '[ZULY] 이메일 인증 요청',
      // text: '평문 보내기 테스트 '
      html: `<h1>아래 링크를 클릭하여 이메일을 인증해주세요.</h1><p>http://localhost:8080/auth/email?token=${authToken}</p>`
  };

  const sendData = await transporter.sendMail(mailOptions);

  let result = false;
  if (sendData.accepted > 0) {
    result = true;
  }

  return true;
};

exports.sendMail = sendMail;
