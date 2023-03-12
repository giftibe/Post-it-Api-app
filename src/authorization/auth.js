const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../models/user.model');
const app = express();

function verifyToken(req, res, next) {
    const bearHeader = req.headers['authorization'];
    if (typeof bearHeader !== 'undefined') {
        const bearToken = bearHeader.split(' ')[1];
        req.token = bearToken;
        next();
    } else {
        return res.status(403).send({
            message: 'Unauthorized request',
            success: false,
        }); // Restricting access if authorization fails
    }
}

module.exports = verifyToken;

//=========
// Middleware to verify JWT
// const verifyToken = async (req, res, next) => {
//     const bearHeader = req.headers.authorization;

//     if (!bearHeader) {
//         return res.status(401).send('Missing authorization header');
//     }

//     const bearToken = bearHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(bearToken, process.env.SECRET_KEY);
//         // req.user = decoded;
//         const email = decoded.email;
//         const password = decoded.password;

//         const user = await Users.findOne(email);

//         if (!user) {
//             return res.status(401).send('Invalid bearToken');
//         }
//         bcrypt.compare(password, storedHash, (err, result) => {
//             if (result) {
//                 console.log('Passwords match!');

//             } else {
//                 return res.status(401).send('Passwords do not match.');
//             }
//         });

//         next();
//     } catch (err) {
//         return res.status(401).send('Invalid bearToken');
//     }
// };
