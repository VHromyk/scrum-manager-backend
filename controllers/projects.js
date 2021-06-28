const HttpCode = require('../helpers/constants');
const { addProject, addSprint, addTask } = require('../model/projects');

const createProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const project = await addProject({ ...req.body, owners: userId });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { project } });
  } catch (error) {
    next(error);
  }
};

const createSprint = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const sprint = await addSprint({ ...req.body, owner: projectId });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { sprint } });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const task = await addTask({ ...req.body, owner: sprintId });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { task } });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, createSprint, createTask };
