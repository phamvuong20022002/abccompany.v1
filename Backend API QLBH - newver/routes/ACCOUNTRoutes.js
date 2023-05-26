'use strict';

const express = require('express');
const ACCControll = require('../controllers/ACCOUNTController');
const router = express.Router();
const verify = require('../security/verifyToken');

router.post('/signin',ACCControll.SignIn);
router.post('/verify/email',verify.accountEmail,ACCControll.sendVerificationEmail);
router.post('/verify/email/verifyotp',verify.accountEmail,ACCControll.verifyOTPEmail);
module.exports = {
    routes: router
}