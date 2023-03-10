const express = require('express');
const Router = express.Router();
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');
const commentRouter = require('./comment.routes');


Router.use('/v1',userRouter);
Router.use('/v1', postRouter);
Router.use('/v1', commentRouter);

module.exports = Router


