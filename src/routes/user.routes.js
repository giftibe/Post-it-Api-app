const express = require('express');
const verify = require('../authorization/auth')
const router = express.Router();
const {
    createAUser,
    fetchAUser,
    fetchAllUser,
    editAUser,
    DeleteAUser,
    fetchAllpostByUserName,
} = require('../controllers/user.controller');

router.post('/users', createAUser);
router.get('/users', fetchAllUser);
router.get('/users/:id/posts', fetchAllpostByUserName);
router.delete('/users/:id', DeleteAUser);
router.get('/users/:id', fetchAUser);
router.put('/users/:id',  editAUser);

module.exports = router;
