const express = require('express');
const tourRouter = require('./tourRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/tours', tourRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/tours', reviewRouter);

module.exports = router;
