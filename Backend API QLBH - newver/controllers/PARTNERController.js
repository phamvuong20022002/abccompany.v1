'use strict';

const PARTNERData = require('../data/partner')

const partner_generalInfo = async (req, res, next) => {
    try {
        const partnerID = req.params.id;
        const partner = await PARTNERData.partner_generalInfo(partnerID);
        res.send(partner);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_Statistical_Cus = async (req, res, next) => {
    try {
        // const data = req.body;
        const data = {
            "madt": req.params.id,
            "sonam": req.params.sonam
        }
        const table = await PARTNERData.partner_Statistical_Cus(data);
        res.send(table);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_NumCus_Type = async (req, res, next) => {
    try {
        const data = req.body;
        const table = await PARTNERData.partner_NumCus_Type(data);
        res.send(table);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_Res_Revenue = async (req, res, next) => {
    try {
        // const data = req.body;
        const data = {
            "madt": req.params.id,
            "sonam": req.params.sonam,
            "sohang": req.params.sohang
        }
        const table = await PARTNERData.partner_Res_Revenue(data);
        res.send(table);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_Statistical_Bills_Status = async (req, res, next) => {
    try {
        // const data = req.body;
        const data = {
            "madt": req.params.id,
            "sonam": req.params.sonam,
        }
        const result = await PARTNERData.partner_Statistical_Bills_Status(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_manageDishes = async (req, res, next) => {
    try {
        const partnerID = req.params.id;
        const list = await PARTNERData.partner_manageDishes(partnerID);
        res.send(list);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_detailDish = async (req, res, next) => {
    try {
        const nameDish = req.params.id;
        const dish = await PARTNERData.partner_detailDish(nameDish);
        res.send(dish);
    }catch (error) {
        res.status(400).send(error.message);
    }
}
const partner_updateDish = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_updateDish(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_manageRestaurants = async (req, res, next) => {
    try {
        const partnerID = req.params.id;
        const list = await PARTNERData.partner_manageRestaurants(partnerID);
        res.send(list);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_getInfo = async (req, res, next) => {
    try {
        const partnerID = req.params.id;
        const info = await PARTNERData.partner_getInfo(partnerID);
        res.send(info);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_updateInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_updateInfo(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_changePassword = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_changePassword(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_addDishes = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_addDishes(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_detailRestaurant = async (req, res, next) => {
    try {
        const ResCode = req.params.id;
        const result  = await PARTNERData.partner_detailRestaurant(ResCode);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_updateRestaurant = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_updateRestaurant(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_createRestaurant = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_createRestaurant(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_changePassRes = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_changePassRes(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_viewResPass = async (req, res, next) => {
    try {
        const data = {
            "madt": req.params.id,
            "mach": req.params.mach,
        }
        const result = await PARTNERData.partner_viewResPass(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_getContract = async (req, res, next) => {
    try {
        const partnerID = req.params.id;
        const result = await PARTNERData.partner_getContract(partnerID);
        res.send(result);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_changeAvatar = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await PARTNERData.partner_changeAvatar(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const verifypass = async (req, res) => {
    try {
        let data = req.body;
        data.key = req.headers['auth-token']
        const result = await PARTNERData.verifypass(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const changeEmail_Phone = async (req, res) => {
    try {
        let data = req.body;
        const result = await PARTNERData.changeEmail_Phone(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_verifyEmail_Phone = async (req, res) => {
    try {
        let data = req.body;
        const result = await PARTNERData.partner_verifyEmail_Phone(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const partner_changeAvatarRes = async (req, res) => {
    try {
        let data = req.body;
        const result = await PARTNERData.partner_changeAvatarRes(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
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