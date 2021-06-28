const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');
const {
  validateCreateProject,
  validateProjectId,
  validateCreateSprint,
} = require('./validation_schema');

router.post('/', guard, validateCreateProject, ctrl.createProject);

router.delete('/:projectId', guard, validateProjectId, ctrl.removeProject);

router.post('/:projectId', guard, validateCreateSprint, ctrl.createSprint);

module.exports = router;
