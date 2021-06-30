const express = require('express');
const router = express.Router();
const ctrlUsers = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const {
  validateCreateUser,
  validateLoginUser,
  validateInviteUser,
} = require('./validation_schema');

router.get('/current', guard, ctrlUsers.current);

router.post('/signup', validateCreateUser, ctrlUsers.signup);

router.post('/login', validateLoginUser, ctrlUsers.login);

router.post('/logout', guard, ctrlUsers.logout);

router.patch(
  '/:projectId/invite',
  guard,
  validateInviteUser,
  ctrlUsers.inviteUser,
);

module.exports = router;
