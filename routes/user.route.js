const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/user', userCtrl.user);
router.get('/logout', userCtrl.logout);


module.exports = router;