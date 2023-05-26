'use strict';

const express = require('express');
const RESControll = require('../controllers/RESController');
const router = express.Router();

router.get('/generalinfo/:id',RESControll.res_generalInfo);
router.get('/getwaitingbill/:id',RESControll.res_getWaitingBills);
router.post('/updatebillstatus',RESControll.res_updateBillStatus);
router.post('/updaterestaurant',RESControll.res_updateRestaurant);
router.get('/detailbill/:id',RESControll.res_detailBill);
router.get('/getorderitems/:id',RESControll.res_getOrderedItems);
router.post('/managebills',RESControll.res_manageBillsInfo);
router.get('/getmenu/:id',RESControll.res_manageDishes);
router.post('/updatedishstatus',RESControll.res_updateDishStatus);
router.post('/detaildish',RESControll.res_detaildish);
router.post('/reportdishes',RESControll.res_reportDishes);
router.post('/statictisGeneralDish',RESControll.res_parentStatictisChart_Dish);


module.exports = {
    routes: router
}