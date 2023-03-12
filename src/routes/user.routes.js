const express = require('express');
const verify = require('../authorization/auth');
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
router.get('/users', verify, fetchAllUser);
router.get('/users/:id/posts', fetchAllpostByUserName);
router.delete('/users/:id', verify, DeleteAUser);
router.get('/users/:id', fetchAUser);
router.put('/users/:id', validateUpdateJoi, editAUser);
router.get('/docs', (req, res) => {
    res.redirect('https://www.google.com');
});

module.exports = router;
