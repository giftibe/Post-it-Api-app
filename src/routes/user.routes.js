const express = require('express');
const verify = require('../authorization/auth')
const validate = require('../middlewares/joi')
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
router.get('/users', verify, fetchAllUser);
router.get('/users/:id/posts', fetchAllpostByUserName);
router.delete('/users/:id', DeleteAUser);
router.get('/users/:id', fetchAUser);
router.put('/users/:id',  editAUser);

module.exports = router;
