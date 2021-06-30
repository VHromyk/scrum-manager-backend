const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');
const {
  validateCreateProject,
  validateUpdateProjectName,
  validateCreateSprint,
  validateCreateTask,
  validateInviteUser,
} = require('./validation_schema');

router.get('/', guard, ctrl.getProjects);

router.get('/sprints/:projectId', guard, ctrl.getSprints);

router.get('/tasks/:sprintId', guard, ctrl.getTasks);

router.post('/', guard, validateCreateProject, ctrl.createProject);

router.post('/sprint/:projectId', guard, validateCreateSprint, ctrl.createSprint);

router.post('/task/:sprintId', guard, validateCreateTask, ctrl.createTask);

router.delete('/:projectId', guard, ctrl.removeProject);

router.patch('/:projectId/name', guard, validateUpdateProjectName, ctrl.updateProjectName);

router.patch('/:projectId/invite', guard, validateInviteUser, ctrl.inviteUser);

module.exports = router;
