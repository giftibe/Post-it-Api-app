const express = require('express');
const router = express.Router();
const {
    createAUser,
    fetchAUser,
    fetchAllUser,
    editAUser,
    DeleteAUser,
} = require('../controllers/user.controller');

router.post('/users', createAUser);
router.get('/users', fetchAllUser);
router.delete('/users/:id', DeleteAUser);
router.get('/users/:id', fetchAUser);
router.put('/users/:id', editAUser);

module.exports = router;
