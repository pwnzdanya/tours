const { body } = require('express-validator');

const reviewValidation = [
  body('text', 'write your review')
    .isString()
    .isLength({
      min: 10,
      max: 100,
    })
    .withMessage(`review's length must be between 10 and 100`),
  body('title', `specify review's title`)
    .isString()
    .isLength({
      min: 5,
      max: 20,
    })
    .withMessage(`review's title length must be between 5 and 20`),
  body('rating', 'rating required')
    .isFloat({ min: 1, max: 5 })
    .withMessage(`Rating must be a number between 1 and 5`),
];

module.exports = reviewValidation;
