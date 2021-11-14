const { body } = require('express-validator');

const signInValidation = [
  body('email', 'enter the email')
    .isEmail()
    .withMessage('incorrect email')
    .isLength({
      min: 8,
      max: 40,
    })
    .withMessage(`Email's length must be between 10 and 40`),
  body('name', 'enter your name')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage(`name's length must be between 2 and 40`),
  body('password', 'enter the password')
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage(`length of password must be minimum of 6 symbols`),
];

module.exports = signInValidation;
