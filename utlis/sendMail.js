const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    // html: '<b>Hello world?</b>', // html body
  });

  await transporter.sendMail(info);
};

module.exports = sendMail;
