const HttpCode = require('../helpers/constants');
const Projects = require('../model/projects');

const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await Projects.getProjectsOfUser(userId);

    if (!projects) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Projects not found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const project = await Projects.addProject({ ...req.body, owners: userId });

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
    const filteredProjects = await Projects.deleteProject(projectId, userId);

    if (!filteredProjects) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { Project: filteredProjects },
    });
  } catch (error) {
    next(error);
  }
};

const updateProjectName = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;
    const updatedProject = await Projects.updateProject(
      userId,
      projectId,
      req.body,
    );

    if (!updatedProject) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    const { name } = updatedProject;

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { Project: { newName: name } },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  removeProject,
  updateProjectName,
  getProjects,
};
