const nodeMailer = require("nodemailer");

exports.sendEmail = emailData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  return (
    transporter
      .sendMail(emailData)
      .then(info => console.log(`Message sent: ${info.response}`))
      .catch(err => console.log(`Problem sending email: ${err}`))
  );
};