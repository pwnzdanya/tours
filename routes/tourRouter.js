const express = require('express');
const Tour = require('../tour/tour.controller');
const auth = require('../middlewares/auth');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();
router.param('id', (req, res, next, value) => {
  console.log(value, 'id');
  next();
});

router.get('/', Tour.getAll);
router.get('/:id', auth, Tour.getOne);
router.post('/', auth, restrictTo('admin'), Tour.create);
router.delete('/:id', auth, restrictTo('admin'), Tour.delete);
router.patch('/', auth, restrictTo('admin'), Tour.patch);

module.exports = router;
