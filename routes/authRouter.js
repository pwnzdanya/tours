const express = require('express');
const AuthContoller = require('../auth/auth.controller');
const signInValidation = require('../validations/signIn');
const forgotPasswordValidation = require('../validations/forgotPassword');

const router = express.Router();

router.post('/signup', signInValidation, AuthContoller.signUp);
router.post('/signin', AuthContoller.signIn);
router.post('/forgotPassword', forgotPasswordValidation, AuthContoller.forgotPassword);
router.patch('/resetPassword/:resetToken', AuthContoller.resetPassword);

module.exports = router;
