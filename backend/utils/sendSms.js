const fast2sms = require("fast-two-sms");

// var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
// var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

// const client = require("twilio")(accountSid, authToken, {
//   lazyLoading: true,
// });

async function sendSms(options) {
  return new Promise((resolve, reject) => {
    const smsOptions = {
      authorization: process.env.FAST2SMS_KEY,
      message: options.message,
      numbers: options.numbers,
    };

    fast2sms
      .sendMessage(smsOptions)
      .then(() => {
        console.log("Sms sent");
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  });
}

module.exports = { sendSms };
