'use strict';

const express = require('express');
const STAFFControll = require('../controllers/STAFFController');
const router = express.Router();

//--------------------------Staff------------------------------
router.get('/getstaffbyid/:id', STAFFControll.staff_getstaffbyid);
router.get('/topfivenewstaff', STAFFControll.staff_top5newstaff);
router.get('/getonestaff/:id', STAFFControll.staff_getInfoOneStaff);
router.get('/managestaff/:id', STAFFControll.staff_manageStaff);
router.get('/listapprovalstaff', STAFFControll.staff_approvalStaff);
router.post('/approvestaff',STAFFControll.staff_approveStaff);
router.post('/deletestaff',STAFFControll.staff_deleteStaff);
router.get('/managepartner/:id', STAFFControll.staff_managePartner);
router.get('/getonepartner/:id', STAFFControll.staff_getInfoOnePartner);
router.get('/getcontract/:id', STAFFControll.staff_getContract);
router.get('/getapprovalcontracts', STAFFControll.staff_getApprovalContracts);
router.post('/approvecontract',STAFFControll.staff_approveContract);
router.post('/deletecontract',STAFFControll.staff_deleteContract);
router.get('/managedriver/:id', STAFFControll.staff_manageDriver);
router.get('/getonedriver/:id', STAFFControll.staff_getInfoOneDriver);
router.get('/listapprovaldriver', STAFFControll.staff_approvalDriver);
router.post('/approvedriver',STAFFControll.staff_approveDriver);
router.post('/deletedriver',STAFFControll.staff_deleteDriver);
router.post('/statisticspartner',STAFFControll.staff_statisticsPartnerRevenue);
router.get('/statistcisallpartner/:id', STAFFControll.staff_statistcisAllPartnerRevenue);
router.get('/statistcisalldriver/:id', STAFFControll.staff_statistcisAllDriverRevenue);
router.post('/statisticsdriver',STAFFControll.staff_statisticsDriverRevenue);
router.get('/badrestaurants/:id', STAFFControll.staff_listBadRestaurants);
router.post('/update',STAFFControll.staff_updateInfomation);

// ---------------FOR TESTING--------------------------------
router.get('/getallstaff',STAFFControll.staff_getallStaff);
module.exports = {
    routes: router
}