'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const res_generalInfo = async(ResID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const result = await pool.request()
                            .input('mach', sql.Char(15), ResID)
                            .query(sqlQueries.res_generalInfo);
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_getWaitingBills = async(ResID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const listBills = await pool.request()
                            .input('mach', sql.Char(15), ResID)
                            .query(sqlQueries.res_getWaitingBills);
        return listBills.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_updateBillStatus = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const result = await pool.request()
                            .input('mach', sql.Char(15), data.mach)
                            .input('madh', sql.Char(15), data.madh)
                            .input('tinhtrang', sql.NChar(20), data.tinhtrang)
                            .query(sqlQueries.res_updateBillStatus);
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_updateRestaurant = async(data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const result = await pool.request()
                            .input('mach', sql.Char(15), data.mach)
                            .input('mk', sql.Char(20), data.mk)
                            .input('giomocua', sql.Char(8), data.giomocua)
                            .input('giodongcua', sql.Char(8), data.giodongcua)
                            .input('tinhtrang', sql.NChar(20), data.tinhtrang)
                            .input('mota', sql.NChar(500), data.mota)
                            .query(sqlQueries.res_updateRestaurant);
        return result.recordset;
    }catch (error) {
        return error.message;
    }
}

const res_detailBill = async(billID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const info = await pool.request()
                            .input('madh', sql.Char(15), billID)
                            .query(sqlQueries.res_detailBill);
        return info.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_getOrderedItems = async(billID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const list = await pool.request()
                            .input('madh', sql.Char(15), billID)
                            .query(sqlQueries.res_getOrderedItems);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_manageBillsInfo = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const list = await pool.request()
                            .input('mach', sql.Char(15), data.mach)
                            .input('type', sql.Char(20), data.type)
                            .input('date_1', sql.Char(20), data.date_1)
                            .input('date_2', sql.Char(20), data.date_2)
                            .query(sqlQueries.res_manageBillsInfo);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_manageDishes = async(ResID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const list = await pool.request()
                            .input('mach', sql.Char(15), ResID)
                            .query(sqlQueries.res_manageDishes);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_updateDishStatus = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const result = await pool.request()
                            .input('mach', sql.Char(15), data.mach)
                            .input('tenmon', sql.NChar(80), data.tenmon)
                            .input('tinhtrang', sql.NChar(20), data.tinhtrang)
                            .query(sqlQueries.res_updateDishStatus);
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_detaildish = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const dish = await pool.request()
                            .input('mach', sql.Char(15), data.mach)
                            .input('tenmon', sql.NChar(80), data.tenmon)
                            .query(sqlQueries.res_detaildish);
        return dish.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_reportDishes = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const list = await pool.request()
                            .input('mach', sql.Char(15), data.mach)
                            .input('type', sql.Char(10), data.type)
                            .input('date1', sql.Char(20), data.date1)
                            .input('date2', sql.Char(20), data.date2)
                            .query(sqlQueries.res_reportDishes);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const res_parentStatictisChart_Dish = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurant');
        const list = await pool.request()
                            .input('mach', sql.Char(15), data.mach)
                            .input('type', sql.Char(10), data.type)
                            .input('date1', sql.Char(20), data.date1)
                            .input('date2', sql.Char(20), data.date2)
                            .query(sqlQueries.res_parentStatictisChart_Dish);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}
module.exports = {
    res_generalInfo, res_getWaitingBills, res_updateBillStatus, res_updateRestaurant, res_detailBill, 
    res_getOrderedItems, res_manageBillsInfo, res_manageDishes, res_updateDishStatus, res_detaildish,
    res_reportDishes, res_parentStatictisChart_Dish
}