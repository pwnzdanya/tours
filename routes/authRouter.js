const express = require('express');
const AuthContoller = require('../auth/auth.controller');

const router = express.Router();

router.post('/signup', AuthContoller.signUp);
router.post('/signin', AuthContoller.signIn);
router.post('/forgotPassword', AuthContoller.forgotPassword);
router.patch('/resetPassword/:resetToken', AuthContoller.resetPassword);

module.exports = router;
