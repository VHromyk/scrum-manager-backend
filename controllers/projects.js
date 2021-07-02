const HttpCode = require('../helpers/constants');
const Projects = require('../model/projects');
const Users = require('../model/users');

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
      projects,
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
      .json({ status: 'success', code: HttpCode.CREATED, project });
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
      Project: filteredProjects,
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
      Project: { name },
    });
  } catch (error) {
    next(error);
  }
};

const inviteUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;
    const { projectId } = req.params;
    const user = await Users.findByEmail(email);

    if (!user) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'User with such email not exists',
      });
    }

    const { _id } = user;
    const updatedProject = await Projects.addUserToProject(
      userId,
      projectId,
      _id,
    );

    if (!updatedProject) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: 'error',
        code: HttpCode.FORBIDDEN,
        message: 'Access denied',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

const getOwners = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const owners = await Projects.getOwnersOfProject(projectId);

    if (!owners) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Owners not found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      owners,
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
  inviteUser,
  getOwners,
};
