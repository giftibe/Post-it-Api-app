const express = require('express');
const jwt = require('jsonwebtoken');
const { getAUser } = require('../services/user.service');

const verifyToken = async (req, res, next) => {
    try {
        const bearHeader = req.headers.authorization;
        try {
            if (!bearHeader) {
                return res.status(401).send('Missing authorization header');
            }
            const bearToken = bearHeader.split(' ')[1];
            const decodedEmail = jwt.verify(bearToken, process.env.SECRET_KEY);
            const checkEmail = await getAUser(req.params.id);
            const idEmail = checkEmail.email; // Do something with the user object
            if (!idEmail) return res.status(401).send('Invalid id');

            if (idEmail !== decodedEmail) {
                return res.send({
                    message: 'access denied',
                    success: false,
                });
            }
            next();
        } catch (error) {
            return console.error(error); // Handle any errors that occurred during the asynchronous operation
        }
    } catch (err) {
        return res.status(401).send('Invalid bearToken');
    }
};
module.exports = verifyToken;
