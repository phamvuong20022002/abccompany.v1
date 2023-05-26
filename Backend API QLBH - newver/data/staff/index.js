'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const staff_getstaffbyid = async(staffID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const staff = await pool.request()
                            .input('manv', sql.Char(15), staffID)
                            .query(sqlQueries.staff_getstaffbyid);
        return staff.recordset;
    } catch (error) {
        return error.message;
    }
}

const staff_top5newstaff = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request().query(sqlQueries.staff_top5newstaff);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const staff_getInfoOneStaff = async(staffID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const staff = await pool.request()
                            .input('manv', sql.Char(15), staffID)
                            .query(sqlQueries.staff_getInfoOneStaff);
        return staff.recordset;
    } catch (error) {
        return error.message;
    }
}

const staff_manageStaff = async(staffID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request()
                            .input('manv', sql.Char(15), staffID)
                            .query(sqlQueries.staff_manageStaff);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const staff_approvalStaff = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request().query(sqlQueries.staff_approvalStaff);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const staff_approveStaff = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('nvduyet', sql.Char(15), data.nvduyet)
                            .input('nv', sql.Char(15), data.nv)
                            .query(sqlQueries.staff_approveStaff);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_deleteStaff = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('nvql', sql.Char(15), data.nvql)
                            .input('nv', sql.Char(15), data.nv)
                            .query(sqlQueries.staff_deleteStaff);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_managePartner = async(staffID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request()
                            .input('manv', sql.Char(15), staffID)
                            .query(sqlQueries.staff_managePartner);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_getInfoOnePartner = async(partnerID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const partner = await pool.request()
                            .input('madt', sql.Char(15), partnerID)
                            .query(sqlQueries.staff_getInfoOnePartner);
        return partner.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_getContract = async(partnerID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const cóntract = await pool.request()
                            .input('madt', sql.Char(15), partnerID)
                            .query(sqlQueries.staff_getContract);
        return cóntract.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_getApprovalContracts = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request().query(sqlQueries.staff_getApprovalContracts);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const staff_approveContract = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), data.manv)
                            .input('mahd', sql.Char(15), data.mahd)
                            .query(sqlQueries.staff_approveContract);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_deleteContract = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), data.manv)
                            .input('mahd', sql.Char(15), data.mahd)
                            .query(sqlQueries.staff_deleteContract);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_manageDriver = async(StaffID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request()
                            .input('manv', sql.Char(15), StaffID)
                            .query(sqlQueries.staff_manageDriver);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_getInfoOneDriver = async(DriverID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const driver = await pool.request()
                            .input('matx', sql.Char(15), DriverID)
                            .query(sqlQueries.staff_getInfoOneDriver);
        return driver.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_approvalDriver = async() => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request()
                            .query(sqlQueries.staff_approvalDriver);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_approveDriver = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), data.manv)
                            .input('matx', sql.Char(15), data.matx)
                            .query(sqlQueries.staff_approveDriver);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_deleteDriver = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), data.manv)
                            .input('matx', sql.Char(15), data.matx)
                            .query(sqlQueries.staff_deleteDriver);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_statisticsPartnerRevenue = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), data.manv)
                            .input('madt', sql.Char(15), data.madt)
                            .input('date', sql.DateTime, data.date)
                            .input('type', sql.Char(10), data.type)
                            .query(sqlQueries.staff_statisticsPartnerRevenue);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_statistcisAllPartnerRevenue = async(staffID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), staffID)
                            .query(sqlQueries.staff_statistcisAllPartnerRevenue);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_statistcisAllDriverRevenue = async(staffID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), staffID)
                            .query(sqlQueries.staff_statistcisAllDriverRevenue);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_statisticsDriverRevenue = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), data.manv)
                            .input('matx', sql.Char(15), data.matx)
                            .input('date', sql.DateTime, data.date)
                            .input('type', sql.Char(10), data.type)
                            .query(sqlQueries.staff_statisticsDriverRevenue);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_listBadRestaurants = async(staffID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), staffID)
                            .query(sqlQueries.staff_listBadRestaurant);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const staff_updateInfomation = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const result = await pool.request()
                            .input('manv', sql.Char(15), data.manv)
                            .input('cmnd', sql.Char(15), data.cmnd)
                            .input('hoten', sql.NChar(30), data.hoten)
                            .input('diachi', sql.NChar(50), data.diachi)
                            .input('stk', sql.Char(15), data.stk)
                            .input('email', sql.Char(30), data.email)
                            .input('mk', sql.Char(20), data.mk)
                            .input('sdt', sql.Char(15), data.sdt)
                            .query(sqlQueries.staff_updateInfomation);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}
// ----------------------------------PROCEDUCE FOR TESTING --------------------------------
const staff_getallStaff = async() => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('staff');
        const list = await pool.request().query(sqlQueries.staff_getallStaff);                
        return list.recordset;
    }catch (error) {
        return error.message;
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