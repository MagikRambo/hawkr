import { uploadShopImage } from "./cdnHelpers"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
// Backend
import formidable from 'formidable';


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mlijczvqqsvotbjytzjm.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

const convertTime12to24 = (time12h:any) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return hours;
}

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err){
      res.status(400).json({ status: `Error: ${err}` });
    }

    console.log('!!!!!!! VENDOR ID !!!!!!!!!!!:   ', fields.vendorID)
    //THIS IS GOOD!
    // console.log('file content: ', files.file)
    let time = fields.hoursOpen + ':' + fields.minutesOpen + ' ' + fields.ampmOpen
    let hoursOpen = convertTime12to24(time.toUpperCase())
    console.log("horus open log: ", hoursOpen) // GOOD

    // let hoursOpen = fields.ampmOpen === 'am'? fields.hoursOpen : fields.hoursOpen + 12
    console.log(time)
    let currDate = new Date()
    var userTimezoneOffset = currDate.getTimezoneOffset() * 60000;
    let timeOpen = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), hoursOpen, fields.minutesOpen, 0,0 )
    // timeOpen.
    console.log(timeOpen)

    let correctedDate = new Date(timeOpen.getTime() - userTimezoneOffset).toISOString()
    console.log('test time: ', correctedDate)


    //Send over time to Supabase rpc

    let vendorID = fields.vendorID
    let shopName = fields.shopName
    let shopDescription = fields.shopDescription
    let messagesOn = fields.messagesOn
    let liveTracking = fields.liveTracking
    let hawkrType = fields.hawkrType
    // let shop_image_url = fields
    console.log('FIELDS VALUES OF SHOPNAME : ', fields.shopName)
    
    //  let timeOpen : Date =  new Date().toISOString();
    
    
    console.log(err, fields, files);

  
    console.log(data, error)
  });
  res.status(200).json({ status: "OK" });

};


/*null {
  shopName: 'afdaa',
  shopDescription: 'fadfad',
  hawkrType: 'Food Truck',
  liveTracking: 'false',
  messagesFlag: 'false',
  hoursOpen: '1',
  minutesOpen: '0',
  ampmOpen: 'am',
  hoursClosed: '1',
  minutesClosed: '0',
  ampmClosed: 'am',
  file: 'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/shop-images/e435ad48-ca90-4ff9-9d01-fc2dcd6c6af8/69665232560__1234EDFD-B2E6-4AEB-8264-C2555DC44947.HEIC'
} {}*/

// export default async function (req, res) {
//     // require("env.local").config();
// //   const supabase = useSupabaseClient();
//   const body =  req.body

//    console.log('body: ' , {body})
//   //  console.log('file: ' , body.file)
//   //  console.log('shopName: ' , body.shopName)
// //    console.log('shopTitle: ' , body[0].shopDescription)
//   // const form = new formidable.IncomingForm();
//   // form.uploadDir = "./";
//   // form.keepExtensions = true;
//   // form.parse(req, (err, fields, files) => {
//   //   console.log('form parsing: ', err, fields, files);
//   // });
//    if (!body.first || !body.last) {
//     // Sends a HTTP bad request error code
//     return res.status(400).json({ data: 'First or last name not found' })
//   }

//     // // "use strict";
//     // let nodemailer = require("nodemailer");
//     // const transporter = nodemailer.createTransport({
//     //   port: 465,
//     //   host: "smtp.gmail.com",
//     //   auth: {
//     //     user: email,
//     //     pass: pass
//     //   },
//     //   secure: true,
//     // });

//     await new Promise((resolve, reject) => {
//     //   transporter.sendMail(mailData, function (err, info) {
//     //     if (err) {
//     //       console.log(err);
//     //       reject(err);
//     //     } else {
//     //       console.log(info);
//     //       resolve(info);
//     //     }
//     //   });
//     });
//     res.status(200).json({ status: "OK" });
//   }
  
