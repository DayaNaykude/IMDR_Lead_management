// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(options) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      // html: options.html,
      templateId: templates["firstmail"],
      dynamic_template_data: {
        applicantName: options.applicantName,
      },

      // attachments: [
      //   {
      //     filename: "email_template",
      //     type: "image/jpg",
      //     content_id: "email_template",
      //     content: fs.readFileSync(filename, {
      //       encoding: "base64",
      //     }),
      //     disposition: "inline",
      //   },
      // ],
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

const resetPasswordMail = (username, resetUrl) => {
  const msg = `
    <h3>Hello ${username}, You have requested a password reset</h3>
    <p>You're receiving this e-mail because you requested a password reset for your user account at IMDR Lead Management.</p>
    
    
    <a href=${resetUrl} clicktracking=off>Click Here To Reset Your Password</a>
    `;

  return msg;
};

module.exports = { sendEmail, resetPasswordMail };
