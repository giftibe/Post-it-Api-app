const express = require('express');
const reqAuth = require('../authorization/reqAuth');
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
router.use('/docs', (req, res) => {
    res.redirect('https://www.google.com');
});

module.exports = router;
