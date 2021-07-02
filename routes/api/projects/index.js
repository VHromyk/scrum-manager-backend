const express = require('express');
const router = express.Router();
const ctrlSprints = require('../../../controllers/sprints');
const ctrlTasks = require('../../../controllers/tasks');
const ctrlProjects = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');

const {
  validateCreateProject,
  validateUpdateProjectName,
  validateInviteUser,
  validateCreateSprint,
  validateCreateTask,
  validateSearchTask,
  validateSpentTimeTask,
} = require('./validation_schema');

router.get('/', guard, ctrlProjects.getProjects);

router.get('/:projectId/sprints', guard, ctrlSprints.getSprints);

router.get('/:projectId/sprints/:sprintId/tasks', guard, ctrlTasks.getTasks);

router.get('/:projectId/owners', guard, ctrlProjects.getOwners);

router.post('/', guard, validateCreateProject, ctrlProjects.createProject);

router.post(
  '/:projectId/sprints',
  guard,
  validateCreateSprint,
  ctrlSprints.createSprint,
);

router.post(
  '/:projectId/sprints/:sprintId/tasks',
  guard,
  validateCreateTask,
  ctrlTasks.createTask,
);

router.post(
  '/:projectId/sprints/:sprintId/tasks/search',
  guard,
  validateSearchTask,
  ctrlTasks.findTaskByName,
);

router.delete('/:projectId', guard, ctrlProjects.removeProject);

router.delete('/:projectId/sprints/:sprintId', guard, ctrlSprints.removeSprint);

router.delete(
  '/:projectId/sprints/:sprintId/tasks/:taskId',
  guard,
  ctrlTasks.removeTask,
);

router.patch(
  '/:projectId/name',
  guard,
  validateUpdateProjectName,
  ctrlProjects.updateProjectName,
);

router.patch(
  '/:projectId/sprints/:sprintId/name',
  guard,
  validateUpdateProjectName,
  ctrlSprints.updateSprintName,
);

router.patch(
  '/:projectId/sprints/:sprintId/tasks/:taskId/time',
  guard,
  validateSpentTimeTask,
  ctrlTasks.changeSpentTime,
);

router.patch(
  '/:projectId/invite',
  guard,
  validateInviteUser,
  ctrlProjects.inviteUser,
);

module.exports = router;
