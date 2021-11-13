const express = require('express');
const tourRouter = require('./tourRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/tours', tourRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
