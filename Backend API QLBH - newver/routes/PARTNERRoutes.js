'use strict';

const express = require('express');
const PARTNERControll = require('../controllers/PARTNERController');
const router = express.Router();
const verify = require('../security/verifyToken');
const verifyKey = require('../security/verifyKey');
const ACCController = require('../controllers/ACCOUNTController');

router.get('/generalinfo/:id',verify.partner,PARTNERControll.partner_generalInfo); // private
router.get('/statiscalcustomerdata/id=:id&sonam=:sonam',verify.partner,PARTNERControll.partner_Statistical_Cus); // private
router.post('/numoftypecus',PARTNERControll.partner_NumCus_Type);
router.get('/restaurantrevenue/id=:id&sonam=:sonam&sohang=:sohang',verify.partner,PARTNERControll.partner_Res_Revenue); // private
router.get('/statiscalbillsstatus/id=:id&sonam=:sonam',verify.partner,PARTNERControll.partner_Statistical_Bills_Status); // private
router.get('/managedishes/:id',PARTNERControll.partner_manageDishes); 
router.get('/detaildish/:id',PARTNERControll.partner_detailDish); 
router.put('/updatedish',verify.partner,PARTNERControll.partner_updateDish);// private
router.get('/managerestaurants/:id',PARTNERControll.partner_manageRestaurants);
router.get('/getinfo/:id',PARTNERControll.partner_getInfo);
router.put('/updateinfo',verify.partner,PARTNERControll.partner_updateInfo);// private
router.put('/changepassword',verify.partner,PARTNERControll.partner_changePassword);//private
router.post('/adddishes',verify.partner,PARTNERControll.partner_addDishes);// private
router.get('/detailrestaurant/:id',PARTNERControll.partner_detailRestaurant);
router.put('/updaterestaurant',verify.partner,PARTNERControll.partner_updateRestaurant);// private
router.post('/createrestaurant',PARTNERControll.partner_createRestaurant);  // private
router.put('/updaterespass',verify.partner,verifyKey.VerifyKey,PARTNERControll.partner_changePassRes);  // private + key 
router.get('/viewrespass/id=:id&mach=:mach',verify.partner,PARTNERControll.partner_viewResPass);  // private
router.get('/getcontract/:id',verify.partner,PARTNERControll.partner_getContract);  // private
router.put('/changeavatar',verify.partner,PARTNERControll.partner_changeAvatar);  // private
router.post('/verifypass/update',verify.partner,PARTNERControll.verifypass);  // private
router.post('/changeemail',verify.partner,ACCController.verifyOTPEmail,PARTNERControll.changeEmail_Phone);  // private + OTP
router.post('/verify/email',verify.partner,ACCController.verifyOTPEmail,PARTNERControll.partner_verifyEmail_Phone);  // private + OTP
router.put('/changeavatar/res',verify.partner,PARTNERControll.partner_changeAvatarRes);  // private
module.exports = {
    routes: router
}