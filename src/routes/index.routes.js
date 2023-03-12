const express = require('express');
const Router = express.Router();
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');

Router.use('/v1', userRouter);
Router.use('/v1/posts', postRouter);

module.exports = Router;
