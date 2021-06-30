const express = require('express');
const router = express.Router();
const ctrlSprints = require('../../../controllers/sprints');
const ctrlTasks = require('../../../controllers/tasks');
const ctrlProjects = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');

const {
  validateCreateProject,
  validateUpdateProjectName,
  validateCreateSprint,
  validateCreateTask,
} = require('./validation_schema');

router.get('/', guard, ctrlProjects.getProjects);

router.get('/sprints/:projectId', guard, ctrlSprints.getSprints);

router.get('/tasks/:sprintId', guard, ctrlTasks.getTasks);

router.post('/', guard, validateCreateProject, ctrlProjects.createProject);

router.post(
  '/sprint/:projectId',
  guard,
  validateCreateSprint,
  ctrlSprints.createSprint,
);

router.post('/task/:sprintId', guard, validateCreateTask, ctrlTasks.createTask);

router.delete('/:projectId', guard, ctrlProjects.removeProject);

router.patch(
  '/:projectId/name',
  guard,
  validateUpdateProjectName,
  ctrlProjects.updateProjectName,
);

module.exports = router;
