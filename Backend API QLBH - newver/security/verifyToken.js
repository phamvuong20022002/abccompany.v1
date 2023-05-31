const jwt = require('jsonwebtoken');
const config = require('../config');

function tokenLogin(req, res, next){
    const token = req.header('auth-token');
    const role = req.header('role');
    if(!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        let verified = jwt.verify(token, config.privateToken);
        let verifyCode = null;
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
        else if(role === "CH"){
            verifyCode = req.body.mach
        }
        else {
            verifyCode = null
        }
        if(verified.username === req.params.id 
            || verified.username === verifyCode){
            next();
        }else{
            throw res.status(400).send('Can not authenticate');
        }
        
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

module.exports = {
    tokenLogin
}