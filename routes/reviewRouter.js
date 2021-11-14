const express = require('express');
const ReviewController = require('../review/review.controller');
const auth = require('../middlewares/auth');
const restrictTo = require('../middlewares/restrictTo');
const review = require('../validations/review');

const router = express.Router();

router.post(
  '/:tourId/reviews',
  auth,
  restrictTo('user'),
  review,
  ReviewController.create
);
router.get(
  '/:tourId/reviews/:reviewId',
  auth,
  restrictTo('user'),
  ReviewController.getOne
);
router.get('/:tourId/reviews/', auth, restrictTo('user'), ReviewController.getAll);
router.delete(
  '/:tourId/reviews/:reviewId',
  auth,
  restrictTo('user'),
  ReviewController.delete
);

module.exports = router;
