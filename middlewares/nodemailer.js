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
      html: `<strong>/users/verify/${token}</strong>`,
      text: `/users/verify/${token}`,
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
