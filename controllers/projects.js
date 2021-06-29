const HttpCode = require('../helpers/constants');
const {
  addProject,
  addSprint,
  addTask,
  deleteProject,
  updateProject,
} = require('../model/projects');

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

const removeProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;
    const filteredProjects = await deleteProject(projectId, userId);

    if (filteredProjects) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { filteredProjects },
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  } catch (error) {
    next(error);
  }
};

const updateProjectName = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;
    const updatedProject = await updateProject(userId, projectId, req.body);

    if (updatedProject) {
      const { name } = updatedProject;

      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, name });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
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

module.exports = {
  createProject,
  createSprint,
  createTask,
  removeProject,
  updateProjectName,
};
