const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const { validateCreateUser } = require('./validation_schema');

router.post('/signup', validateCreateUser, ctrl.signup);
router.post('/login', ctrl.login);

module.exports = router;
