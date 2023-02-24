const nodeMailer = require("nodemailer");

const sendEmail = async (EmailTo, EmailBody, EmailSubject) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dev.shahrear@gmail.com", // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  // send mail with defined transport object
  const message = {
    from: '"Password recovery - Inventory" <dev.shahrear@gmail.com>', // sender address
    to: EmailTo, // list of receivers
    subject: EmailSubject, // Subject line
    html: EmailBody, // html body
  };

  // send mail with defined transport object and return info
  return await transporter.sendMail(message);
};

module.exports = sendEmail;