const express = require('express');
const reqAuth = require('../authorization/signInAuth');
const authPass = require('../authorization/auth.key')
const { validateUserJoi, validateUpdateJoi } = require('../middlewares/joi');
const router = express.Router();

const {
    createAUser,
    login,
    logout,
    fetchAUser,
    fetchAllUser,
    editAUser,
    DeleteAUser,
    fetchAllpostByUserName,
} = require('../controllers/user.controller');

router.post('/users', validateUserJoi, authPass, createAUser);
router.post('/users/login', authPass, login);
router.post('/users/logout', authPass, logout);
router.get('/users', fetchAllUser);
router.get('/users/:id/posts', fetchAllpostByUserName);
router.delete('/users/:id', reqAuth, DeleteAUser);
router.get('/users/:id', fetchAUser);
router.put('/users/:id', validateUpdateJoi, editAUser);


module.exports = router;
