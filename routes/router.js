const express = require('express');
const tourRouter = require('./tourRouter');

const router = express.Router();

router.use('/tours', tourRouter);

module.exports = router;
