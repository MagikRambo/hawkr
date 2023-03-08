

const email = process.env.NEXT_PUBLIC_EMAIL;
const pass = process.env.NEXT_PUBLIC_EMAIL_PASS;

export default async function (req, res) {
    // require("env.local").config();
  
    "use strict";
    let nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: email,
        pass: pass
      },
      secure: true,
    });
    const mailData = {
      from: email,
      to: email,
      subject: req.body.subject,
      //   text: req.body.message + " | Sent from: " + req.body.email,
      html: `
      <div><strong>Name:</strong> ${req.body.fullName}</div>
      <br/>
      <div><strong>Email:</strong> ${req.body.email}</div>
      <br/>
      <div><strong>Subject:</strong> ${req.body.subject}</div>
      <br/>
      <div><strong>Message:</strong> ${req.body.message}</div>
      <br/>
      <p>Sent from:
        ${req.body.email}</p>`,
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
    res.status(200).json({ status: "OK" });
  }
  