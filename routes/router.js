const express = require('express');
const tourRouter = require('./tourRouter');
const authRouter = require('./authRouter');

const router = express.Router();

router.use('/tours', tourRouter);
router.use('/auth', authRouter);

module.exports = router;
