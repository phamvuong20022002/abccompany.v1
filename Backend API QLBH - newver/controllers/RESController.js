'use strict';

const ResData = require('../data/restaurant')

const res_generalInfo = async (req, res, next) => {
    try {
        const ResID = req.params.id;
        const result = await ResData.res_generalInfo(ResID);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const res_getWaitingBills = async (req, res, next) => {
    try {
        const ResID = req.params.id;
        const listBills = await ResData.res_getWaitingBills(ResID);
        res.send(listBills);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const res_updateBillStatus = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await ResData.res_updateBillStatus(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const res_updateRestaurant = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await ResData.res_updateRestaurant(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const res_detailBill = async (req, res, next) => {
    try {
        const billID = req.params.madh;
        const info = await ResData.res_detailBill(billID);
        res.send(info);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const res_getOrderedItems = async (req, res, next) => {
    try {
        const billID = req.params.id;
        const list = await ResData.res_getOrderedItems(billID);
        res.send(list);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const res_manageBillsInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const list = await ResData.res_manageBillsInfo(data);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const res_manageDishes = async (req, res, next) => {
    try {
        const ResID = req.params.id;
        const list = await ResData.res_manageDishes(ResID);
        res.send(list);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const res_updateDishStatus = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await ResData.res_updateDishStatus(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const res_detaildish = async (req, res, next) => {
    try {
        let data = {
            "mach" : req.params.id,
            "tenmon": req.params.tenmon,
        }
        const dish = await ResData.res_detaildish(data);
        res.send(dish);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const res_reportDishes = async (req, res, next) => {
    try {
        const data = req.body;
        const list = await ResData.res_reportDishes(data);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const res_parentStatictisChart_Dish = async (req, res, next) => {
    try {
        const data = req.body;
        const list = await ResData.res_parentStatictisChart_Dish(data);
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    res_generalInfo, res_getWaitingBills, res_updateBillStatus, res_updateRestaurant, res_detailBill,
    res_getOrderedItems, res_manageBillsInfo, res_manageDishes, res_updateDishStatus, res_detaildish,
    res_reportDishes, res_parentStatictisChart_Dish
}