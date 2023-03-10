const express = require('express');
const app = express();
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');

module.exports = app.use('/v1',userRouter);
