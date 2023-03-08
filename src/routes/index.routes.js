const express = require('express');
const app = express();
const userRouter = require('./user.routes');

module.exports = app.use('/v',userRouter);
