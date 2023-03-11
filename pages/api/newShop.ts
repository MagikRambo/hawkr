import { uploadShopImage } from "./cdnHelpers"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import formidable from 'formidable'

export default async function (req, res) {
    // require("env.local").config();
//   const supabase = useSupabaseClient();
  const body =  req.body

  //  console.log('body: ' , body)
  //  console.log('file: ' , body.file)
  //  console.log('shopName: ' , body.shopName)
//    console.log('shopTitle: ' , body[0].shopDescription)
  // const form = new formidable.IncomingForm();
  // form.uploadDir = "./";
  // form.keepExtensions = true;
  // form.parse(req, (err, fields, files) => {
  //   console.log('form parsing: ', err, fields, files);
  // });
   if (!body.first || !body.last) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'First or last name not found' })
  }

    // // "use strict";
    // let nodemailer = require("nodemailer");
    // const transporter = nodemailer.createTransport({
    //   port: 465,
    //   host: "smtp.gmail.com",
    //   auth: {
    //     user: email,
    //     pass: pass
    //   },
    //   secure: true,
    // });

    await new Promise((resolve, reject) => {
    //   transporter.sendMail(mailData, function (err, info) {
    //     if (err) {
    //       console.log(err);
    //       reject(err);
    //     } else {
    //       console.log(info);
    //       resolve(info);
    //     }
    //   });
    });
    res.status(200).json({ status: "OK" });
  }
  