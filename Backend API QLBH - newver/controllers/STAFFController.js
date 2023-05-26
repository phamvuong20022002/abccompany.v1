'use strict';

const StaffData = require('../data/staff')

const staff_getstaffbyid = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const staff = await StaffData.staff_getstaffbyid(staffId);
        res.send(staff);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const staff_top5newstaff = async (req, res, next) => {
    try {
        const list = await StaffData.staff_top5newstaff();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_getInfoOneStaff = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const staff = await StaffData.staff_getInfoOneStaff(staffId);
        res.send(staff);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_manageStaff = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const list = await StaffData.staff_manageStaff(staffId);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_approvalStaff = async (req, res, next) => {
    try {
        const list = await StaffData.staff_approvalStaff();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_approveStaff = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_approveStaff(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_deleteStaff = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_deleteStaff(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_managePartner = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const list = await StaffData.staff_managePartner(staffId);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_getInfoOnePartner = async (req, res, next) => {
    try {
        const partnerID = req.params.id;
        const partner = await StaffData.staff_getInfoOnePartner(partnerID);
        res.send(partner);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_getContract = async (req, res, next) => {
    try {
        const partnerID = req.params.id;
        const contract = await StaffData.staff_getContract(partnerID);
        res.send(contract);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_getApprovalContracts = async (req, res, next) => {
    try {
        const list = await StaffData.staff_getApprovalContracts();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_approveContract = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_approveContract(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_deleteContract = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_deleteContract(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_manageDriver = async (req, res, next) => {
    try {
        const staffID = req.params.id;
        const list = await StaffData.staff_manageDriver(staffID);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_getInfoOneDriver = async (req, res, next) => {
    try {
        const DriverID = req.params.id;
        const driver = await StaffData.staff_getInfoOneDriver(DriverID);
        res.send(driver);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_approvalDriver = async (req, res, next) => {
    try {
        const list = await StaffData.staff_approvalDriver();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_approveDriver = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_approveDriver(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_deleteDriver = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_deleteDriver(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_statisticsPartnerRevenue = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_statisticsPartnerRevenue(data);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_statistcisAllPartnerRevenue = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const list = await StaffData.staff_statistcisAllPartnerRevenue(staffId);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_statistcisAllDriverRevenue = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const list = await StaffData.staff_statistcisAllDriverRevenue(staffId);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_statisticsDriverRevenue = async (req, res, next) => {
    try {
        const data = req.body;
        const list = await StaffData.staff_statisticsDriverRevenue(data);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_listBadRestaurants = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const list = await StaffData.staff_listBadRestaurants(staffId);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_updateInfomation = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await StaffData.staff_updateInfomation(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const staff_getallStaff = async (req, res, next) => {
    try {
        const list = await StaffData.staff_getallStaff();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    staff_getstaffbyid, staff_top5newstaff, staff_getInfoOneStaff, staff_manageStaff, staff_approvalStaff,
    staff_approveStaff, staff_deleteStaff, staff_managePartner, staff_getInfoOnePartner, staff_getContract,
    staff_getApprovalContracts, staff_approveContract, staff_deleteContract, staff_manageDriver, staff_getInfoOneDriver,
    staff_approvalDriver, staff_approveDriver, staff_deleteDriver, staff_statisticsPartnerRevenue,
    staff_statistcisAllPartnerRevenue, staff_statistcisAllDriverRevenue, staff_statisticsDriverRevenue,
    staff_listBadRestaurants, staff_updateInfomation, staff_getallStaff
}