const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

const message = (username, resetUrl) => {
  const msg = `
    <h3>Hello ${username}, You have requested a password reset</h3>
    <p>You're receiving this e-mail because you requested a password reset for your user account at IMDR Lead Management.</p>
    
    
    <a href=${resetUrl} clicktracking=off>Click Here To Reset Your Password</a>
    `;

  return msg;
};
module.exports = { sendEmail, message };
