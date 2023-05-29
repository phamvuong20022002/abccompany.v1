'use strict';
const nodemailer = require('nodemailer');


//config email account 
let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user: "abc.company.hotro@gmail.com",
        pass: "oeojdmhmnlcthnjy",
    },
})
// test email transport
transporter.verify((error, success) =>{
    if(error){
        console.log(error.message)
    }else{
        console.log("Ready for messages...")
    }
})
// expert module send mail
const sendEmail = async (mailOptions) =>{
    try {
        await transporter.sendMail(mailOptions) 
    } catch (error) {
        throw error
    }
}
// --------------------------SEND SMS---------------------------------
async function sendSMS() {
    
}

module.exports = {
    sendEmail, sendSMS
}