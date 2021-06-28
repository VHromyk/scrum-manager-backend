const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');
const {
  validateCreateProject,
  validateCreateSprint,
  validateCreateTask,
} = require('./validation_schema');

router.post('/', guard, validateCreateProject, ctrl.createProject);

router.post(
  '/sprint/:projectId',
  guard,
  validateCreateSprint,
  ctrl.createSprint,
);

router.post('/task/:sprintId', guard, validateCreateTask, ctrl.createTask);

module.exports = router;
