const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
});


const getOptions = (emailsDest, message) => ({
  from: 'notifyme@gmail.com',
  to: emailsDest.join(", "),
  subject: 'Notification - Notify Me',
  text: message
})


const mailLogger = (error, info) => {
  if (error) {
    console.error('Error sending e-mail', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}


const sendEMail = async (emailsDest, message) => {
  const mailOptions = getOptions(emailsDest, message)
  transporter.sendMail(mailOptions, mailLogger)
}

module.exports = {
  sendEMail
}
