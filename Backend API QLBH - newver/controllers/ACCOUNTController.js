'use strict';

const ACCOUNTData = require('../data/account')
const utils = require('./utils')


const SignIn = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await ACCOUNTData.SignIn(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}
//send OTP verification Email Address
const sendVerificationEmail = async (req, res) => {
    try {
        if(req.body.email === null || (req.body.email).length === 0) {
            let dataWrite = {
                "OTPCODE": false,
                "EMAIL": req.body.email,
            }
            throw res.status(400).send(dataWrite);
        }
        // generate otp
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        let dataWrite = {
            "otpcode": otp,
            "email": req.body.email,
        }
        // write otp to sql server
        const result = await ACCOUNTData.createOTPEmailCode(dataWrite);
        result[0].OTPCODE = false
        let emailAddress = req.body.email;

        // send email
        let otpDetails = {
            to: emailAddress,
            subject: "Email Verification",
            html: `<img src='https://res.cloudinary.com/dayrqfwxo/image/upload/v1685002272/samples/logo/sildrshuabayhvcva5cw.png'><p>Verify your email with code for <b>username: ${req.body[Object.keys(req.body)[1]]}</b></p> <p style = "color: 
            tomato; font-size: 25px; letter-spacing: 2px;"><b>${otp}</b></p> <p>This code will <b>expire in 1 hour(s)</b>.</p>`,
            duration: 1
        }
        await utils.sendEmail(otpDetails)
        result[0].OTPCODE = true
        res.send(result)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const verifyOTPEmail = async (req, res, next) =>{
    try {
        const data = req.body;
        await ACCOUNTData.verifyOTPEmail(data).then((result) =>{
            if(result[0].RESULT === '1'){
                next();
            }
            else{
                res.send(result)
            }
        })
        // res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const sendVerificationSMS = async (req, res, next) =>{
    try {
        // const data = req.body;
        // await ACCOUNTData.verifyOTPEmail(data).then((result) =>{
        //     if(result[0].RESULT === '1'){
        //         next();
        //     }
        //     else{
        //         res.send(result)
        //     }
        // })
        const result = await utils.sendSMS()
        res.send(result)
    }catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    SignIn, sendVerificationEmail, verifyOTPEmail, sendVerificationSMS
}