const express = require('express');
const reqAuth = require('../authorization/signInAuth');
const { validateUserJoi, validateUpdateJoi } = require('../middlewares/joi');
const router = express.Router();
const {
    createAUser,
    fetchAUser,
    fetchAllUser,
    editAUser,
    DeleteAUser,
    fetchAllpostByUserName,
} = require('../controllers/user.controller');

router.post('/users', validateUserJoi, createAUser);
router.get('/users', fetchAllUser);
router.get('/users/:id/posts', fetchAllpostByUserName);
router.delete('/users/:id', reqAuth, DeleteAUser);
router.get('/users/:id', fetchAUser);
router.put('/users/:id', validateUpdateJoi, editAUser);
router.get('/docs', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24128572/2s93JusNJv');
});

module.exports = router;
