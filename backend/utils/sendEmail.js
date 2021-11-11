// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(options) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      templateId: templates[options.template],
      dynamic_template_data: options.data,
    };

    sgMail
      .send(mailOptions)
      .then(() => {
        console.log("Email sent");
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  });
}

module.exports = { sendEmail };
