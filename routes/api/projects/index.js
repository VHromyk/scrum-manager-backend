const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');
const { validateCreateProject } = require('./validation_schema');

router.post('/', guard, validateCreateProject, ctrl.createProject);

module.exports = router;
