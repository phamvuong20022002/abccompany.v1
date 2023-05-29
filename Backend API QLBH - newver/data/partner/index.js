'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const partner_generalInfo = async(ParnerID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const partner = await pool.request()
                            .input('madt', sql.Char(15), ParnerID)
                            .query(sqlQueries.partner_generalInfo);
        return partner.recordset;
    } catch (error) {
        return error.message;
    }
}

const partner_Statistical_Cus = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const table = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('sonam', sql.Int, data.sonam)
                            .query(sqlQueries.partner_Statistical_Cus);
        return table.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_NumCus_Type = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const table = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('sonam', sql.Int, data.sonam)
                            .query(sqlQueries.partner_NumCus_Type);
        return table.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_Res_Revenue = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const table = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('sonam', sql.Int, data.sonam)
                            .input('sohang', sql.Int, data.sohang)
                            .query(sqlQueries.partner_Res_Revenue);
        return table.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_Statistical_Bills_Status = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('sonam', sql.Int, data.sonam)
                            .query(sqlQueries.partner_Statistical_Bills_Status);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_manageDishes = async(partnerID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const list = await pool.request()
                            .input('madt', sql.Char(15), partnerID)
                            .query(sqlQueries.partner_manageDishes);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_getContract = async(partnerID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), partnerID)
                            .query(sqlQueries.partner_getContract);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_detailDish = async(nameDish) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const dish = await pool.request()
                            .input('tenmon', sql.NChar(80), nameDish)
                            .query(sqlQueries.partner_detailDish);
        return dish.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_updateDish = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('tenmon', sql.NChar(80), data.tenmon)
                            .input('mieuta', sql.NChar(255), data.mieuta)
                            .input('gia', sql.Float, data.gia)
                            .input('tinhtrang', sql.NChar(20), data.tinhtrang)
                            .input('ghichu', sql.NChar(50), data.ghichu)
                            .query(sqlQueries.partner_updateDish);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_manageRestaurants = async(partnerID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const list = await pool.request()
                            .input('madt', sql.Char(15), partnerID)
                            .query(sqlQueries.partner_manageRestaurants);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_getInfo = async(partnerID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const info = await pool.request()
                            .input('madt', sql.Char(15), partnerID)
                            .query(sqlQueries.partner_getInfo);
        return info.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_updateInfo = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('diachi', sql.NChar(50), data.diachi)
                            .input('loaiamthuc', sql.NChar(20), data.loaiamthuc)
                            .input('quan', sql.NChar(20), data.quan)
                            .input('sldhdk', sql.Int, data.sldhdk)
                            .input('tendoitac', sql.NChar(30), data.tendoitac)
                            .input('nguoidaidien', sql.NChar(30), data.nguoidaidien)
                            .query(sqlQueries.partner_updateInfo);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_changePassword = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('mk', sql.Char(20), data.mk)
                            .input('mkmoi', sql.Char(20), data.mkmoi)
                            .query(sqlQueries.partner_changePassword);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_addDishes = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('tenmon', sql.NChar(80), data.tenmon)
                            .input('mieuta', sql.NChar(255), data.mieuta)
                            .input('gia', sql.Float, data.gia)
                            .input('tinhtrang', sql.NChar(20), data.tinhtrang)
                            .input('ghichu', sql.NChar(50), data.ghichu)
                            .query(sqlQueries.partner_addDishes);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_detailRestaurant = async(ResCode) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const info = await pool.request()
                            .input('mach', sql.Char(15), ResCode)
                            .query(sqlQueries.partner_detailRestaurant);
        return info.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_updateRestaurant = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('mach', sql.Char(15), data.mach)
                            .input('stk', sql.Char(15), data.stk)
                            .input('nganhang', sql.NChar(35), data.nganhang)
                            .input('giomocua', sql.Char(8), data.giomocua)
                            .input('giodongcua', sql.Char(8), data.giodongcua)
                            .input('tinhtrang', sql.NChar(20), data.tinhtrang)
                            .input('mota', sql.NChar(500), data.mota)
                            .query(sqlQueries.partner_updateRestaurant);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_createRestaurant = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('mach', sql.Char(15), data.mach)
                            .input('stk', sql.Char(15), data.stk)
                            .input('nganhang', sql.NChar(35), data.nganhang)
                            .input('tenquan', sql.NChar(35), data.tenquan)
                            .input('giomocua', sql.Char(8), data.giomocua)
                            .input('giodongcua', sql.Char(8), data.giodongcua)
                            .input('tinhtrang', sql.NChar(20), data.tinhtrang)
                            .input('diachi', sql.NChar(50), data.diachi)
                            .input('mota', sql.NChar(500), data.mota)
                            .input('mk', sql.Char(20), data.mk)
                            .input('avatar', sql.Char(255), data.avatar)
                            .query(sqlQueries.partner_createRestaurant);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_changePassRes = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('mach', sql.Char(15), data.mach)
                            .input('newpass', sql.Char(20), data.newpass)
                            .query(sqlQueries.partner_changePassRes);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_viewResPass = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('mach', sql.Char(15), data.mach)
                            .query(sqlQueries.partner_viewResPass);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_changeAvatar = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('newurl', sql.Char(255), data.newurl)
                            .query(sqlQueries.partner_changeAvatar);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const verifypass = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
            .input('madt', sql.Char(15), data.madt)
            .input('pass', sql.Char(20), data.mk)
            .query(sqlQueries.verifyPass);
        
        if(result.recordset[0].RESULT === '1') {
            let num = Math.floor(Math.random() * 13) + 2
            let key = Math.random().toString(num).slice(2)
            result.recordset[0].TEXT_CONNECT = key + data["key"].substring( key.length, key.length + 5)
        }
        else{
            result.recordset[0].TEXT_CONNECT = null
        }
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

const changeEmail_Phone = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('email', sql.Char(255), data.email)
                            .input('type', sql.Char(15), data.type)
                            .input('sdt', sql.Char(20), null)
                            .query(sqlQueries.changeEmail_Phone);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_verifyEmail_Phone = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('email', sql.Char(255), data.email)
                            .input('type', sql.Char(15), data.type)
                            .input('sdt', sql.Char(20), null)
                            .query(sqlQueries.partner_verifyEmail_Phone);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const partner_changeAvatarRes = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partner');
        const result = await pool.request()
                            .input('madt', sql.Char(15), data.madt)
                            .input('mach', sql.Char(15), data.mach)
                            .input('avatar', sql.Char(255), data.newurl)
                            .query(sqlQueries.partner_changeAvatarRes);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

module.exports = {
    partner_generalInfo, partner_Statistical_Cus, partner_NumCus_Type, partner_Res_Revenue,
    partner_Statistical_Bills_Status, partner_manageDishes, partner_detailDish, partner_updateDish,
    partner_manageRestaurants, partner_getInfo, partner_updateInfo, partner_changePassword, partner_addDishes,
    partner_detailRestaurant, partner_updateRestaurant, partner_createRestaurant, partner_changePassRes, 
    partner_viewResPass, partner_getContract, partner_changeAvatar, verifypass, changeEmail_Phone,
    partner_verifyEmail_Phone, partner_changeAvatarRes
}