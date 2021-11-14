const express = require('express');
const UserController = require('../user/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.patch('/', auth, UserController.updatePassword);
router.delete('/', auth, UserController.delete);

module.exports = router;
