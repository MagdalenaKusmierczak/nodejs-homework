const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
require("dotenv").config();
const API_KEY = process.env.MAILGUN_API_KEY;

const auth = {
  auth: {
    api_key: API_KEY,
    domain: "sandboxb6ee5da89ed34859ab0dee94b0c38851.mailgun.org",
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const sendEmail = (to, token) => {
  nodemailerMailgun.sendMail(
    {
      from: '<mailgun@sandbox-123.mailgun.org>',
      to: [to],
      subject: "Welcome in our fun database",
      html: `<p>To confirm your registration, please click on the link below</p>
  <a href="http://localhost:3000/api/users/verify/${token}">Click me</a>`,
      text: `To confirm your registration, please go to :
  http://localhost:3000/api/users/verify/${token}`,
    },
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );
};

module.exports = sendEmail;
