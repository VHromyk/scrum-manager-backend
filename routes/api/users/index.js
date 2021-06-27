const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const { validateCreateUser } = require('./validation_schema');

router.post('/signup', validateCreateUser, ctrl.signup);
router.post('/login', ctrl.login);
router.post('/logout', guard, ctrl.logout);

module.exports = router;
