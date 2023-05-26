'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const jwt = require('jsonwebtoken');

const SignIn = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('account');
        const result = await pool.request()
                        .input('username', sql.Char(50), data.username)
                        .input('password', sql.Char(50), data.password)
                        .query(sqlQueries.SignIn);
        let check = Object.keys(result.recordset[0]).toString();
        if (check === "RESULT") {
            let token = jwt.sign({username: data.username}, config.privateToken, {expiresIn: "2h",});
            result.recordset[0]["auth-token"] = token;
            result.recordset[0]["login-status"] = true;
        }else {
            result.recordset[0]["auth-token"] = null;
            result.recordset[0]["login-status"] = false;
        }
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

const createOTPEmailCode = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('account');
        const result = await pool.request()
                        .input('email', sql.Char(255), data.email)
                        .input('otpcode', sql.Char(255), data.otpcode)
                        .query(sqlQueries.createOTPEmail);
        return result.recordset;
    } catch (error) {
        
    }
}

const verifyOTPEmail = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('account');
        const result = await pool.request()
                        .input('email', sql.Char(255), data.email)
                        .input('otpcode', sql.Char(255), data.otpcode)
                        .query(sqlQueries.checkOTPEmail);
        return result.recordset;
    } catch (error) {
        
    }
}
module.exports = {
    SignIn, createOTPEmailCode, verifyOTPEmail
}