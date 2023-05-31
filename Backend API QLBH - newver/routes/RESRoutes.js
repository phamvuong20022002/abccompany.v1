'use strict';

const express = require('express');
const RESControll = require('../controllers/RESController');
const router = express.Router();
const verify = require('../security/verifyToken')

router.get('/generalinfo/:id',verify.tokenLogin,RESControll.res_generalInfo); // private
router.get('/getwaitingbill/:id',verify.tokenLogin,RESControll.res_getWaitingBills); //private
router.post('/updatebillstatus',verify.tokenLogin,RESControll.res_updateBillStatus); //private
router.post('/updaterestaurant',verify.tokenLogin,RESControll.res_updateRestaurant); //private
router.get('/detailbill/id=:id&madh=:madh',verify.tokenLogin,RESControll.res_detailBill); //private
router.get('/getorderitems/id=:id&madh=:madh',verify.tokenLogin,RESControll.res_getOrderedItems); //private
router.post('/managebills',verify.tokenLogin,RESControll.res_manageBillsInfo); //private
router.get('/getmenu/:id',verify.tokenLogin,RESControll.res_manageDishes); //private
router.post('/updatedishstatus',verify.tokenLogin,RESControll.res_updateDishStatus);//private
router.get('/detaildish/id=:id&tenmon=:tenmon',RESControll.res_detaildish);
router.post('/reportdishes',verify.tokenLogin,RESControll.res_reportDishes);
router.post('/statictisGeneralDish',verify.tokenLogin,RESControll.res_parentStatictisChart_Dish);


module.exports = {
    routes: router
}