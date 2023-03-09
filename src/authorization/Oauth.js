const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../postit.models/user.model');
const app = express();

// Middleware to verify JWT
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // req.user = decoded;
        const email = decoded.email;
        const password = decoded.email;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).send('Invalid token');
        }
        bcrypt.compare(password, storedHash, (err, result) => {
            if (result) {
                console.log('Passwords match!');
                next();
            } else {
                return res.status(401).send('Passwords do not match.');
            }
        });

        // next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
};
module.exports = verifyToken;
