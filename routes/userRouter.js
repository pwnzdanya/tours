const express = require('express');
const UserController = require('../user/user.contoller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.patch('/', auth, UserController.updatePassword);
router.delete('/', auth, UserController.delete);

module.exports = router;
