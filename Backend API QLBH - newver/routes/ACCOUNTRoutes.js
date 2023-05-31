'use strict';

const express = require('express');
const ACCControll = require('../controllers/ACCOUNTController');
const router = express.Router();
const verify = require('../security/verifyToken');

router.post('/signin',ACCControll.SignIn);
router.post('/verify/email',verify.tokenLogin,ACCControll.sendVerificationEmail);
router.post('/verify/email/verifyotp',verify.tokenLogin,ACCControll.verifyOTPEmail);
router.post('/verify/sms',verify.tokenLogin,ACCControll.sendVerificationSMS);
module.exports = {
    routes: router
}