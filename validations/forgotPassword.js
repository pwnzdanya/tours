const { body } = require('express-validator');

const forgotPasswordValidation = [
  body('email', 'enter the email')
    .isEmail()
    .withMessage('incorrect email')
    .isLength({
      min: 8,
      max: 40,
    })
    .withMessage(`Email's length must be between 10 and 40`),

  body('password', 'enter the password')
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage(`length of password must be minimum of 6 symbols`),
];

module.exports = forgotPasswordValidation;
