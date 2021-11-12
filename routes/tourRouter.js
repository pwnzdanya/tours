const express = require('express');
const Tour = require('../tour/tour.contoller');

const router = express.Router();
router.param('id', (req, res, next, value) => {
  console.log(value, 'id');
  next();
});

router.get('/', Tour.getAll);
router.get('/:id', Tour.getOne);
router.post('/', Tour.create);
router.delete('/:id', Tour.delete);
router.patch('/', Tour.patch);

module.exports = router;
