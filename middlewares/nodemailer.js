const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
require("dotenv").config();
const API_KEY = process.env.MAILGUN_API__KEY;

const auth = {
  auth: {
    api_key: API_KEY,
    domain: "sandboxb6ee5da89ed34859ab0dee94b0c38851.mailgun.org",
  },
  host: "api.eu.mailgun.net",
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const msg = (to, token) => {
  nodemailerMailgun.sendMail(
    {
      from: "m-kusmierczak@o2.pl",
      to: to,
      subject: "Welcome in our fun database",
      html: `<p>To confirm your registration, please click on the link below</p>
  <a href="http://localhost:3000/api/users/verify/${token}">Click me</a>`,
      text: `To confirm your registration, please go to :
  http://localhost:3000/api/users/verify/${token}`,
    },
    (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Response: ${info}`);
      }
    }
  );
};

module.exports = msg;
