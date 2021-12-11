// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const templates = {
  resetpass: "d-bc0246f42e2f4e07b186de00ea762818",
  firstmail: "d-2ece847555d84b108b7cb97cb9cdbc51",
};

async function sendEmail(options) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: options.from,
      replyTo: "sahil.kavitake@outlook.com",
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
