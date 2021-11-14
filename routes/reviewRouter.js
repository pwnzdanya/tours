const express = require('express');
const ReviewController = require('../review/review.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/:tourId/reviews', auth, ReviewController.create);
router.get('/:tourId/reviews/:reviewId', auth, ReviewController.getOne);
router.get('/:tourId/reviews/', auth, ReviewController.getAll);
router.delete('/:tourId/reviews/:reviewId', auth, ReviewController.delete);

module.exports = router;
