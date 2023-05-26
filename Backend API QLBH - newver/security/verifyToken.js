const jwt = require('jsonwebtoken');
const config = require('../config');

function partner(req, res, next){
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        let verified = jwt.verify(token, config.privateToken);
        if(verified.username === req.params.id || verified.username === req.body.madt){
            next();
        }else{
            throw res.status(400).send('Can not authenticate');
        }
        
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

function accountEmail(req, res, next){
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        let role = req.body.role
        let verifyCode = null
        if(role === null ){
            throw res.status(400).send('Can not authenticate');
        }
        if(role === "DT"){
            verifyCode = req.body.madt
        }
        else if(role === "NV"){
            verifyCode = req.body.manv
        }
        else if(role === "KH"){
            verifyCode = req.body.makh
        }
        else if(role === "TX"){
            verifyCode = req.body.matx
        }
        let verified = jwt.verify(token, config.privateToken);
        if(verified.username === verifyCode){
            next();
        }else{
            throw res.status(400).send('Can not authenticate');
        }
        
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}
module.exports = {
    partner, accountEmail
}