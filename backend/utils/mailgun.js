const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

// Step 1
const sendEmail = (options) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };

  // Step 2
  let transporter = nodemailer.createTransport(mailGun(auth));

  // Step 3
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  // Step 4
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("email not sent");
      console.log(err);
    } else {
      console.log("email sent success");
      console.log(data);
    }
  });
};

module.exports = { sendEmail };
