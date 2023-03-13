const express = require('express');
const jwt = require('jsonwebtoken');
const { getAUser } = require('../services/user.service');

function AuthUser(req, res, next) {
    const bearHeader = req.headers['authorization'];
    if (typeof bearHeader !== 'undefined') {
        const bearToken = bearHeader.split(' ')[1];
        req.token = bearToken;
        next();
    } else {
        return res.status(403).send({
            message: 'Unauthorized request, created account or input header',
            success: false,
        }); // Restricting access if authorization fails
    }
}
module.exports = AuthUser;
