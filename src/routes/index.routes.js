const express = require('express');
const Router = express.Router();
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');

Router.use('/v1', userRouter);
Router.use('/v1/posts', postRouter);
Router.use('v1/docs', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24128572/2s93JusNJv');
});

module.exports = Router;
