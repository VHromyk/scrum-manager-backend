const HttpCode = require('../helpers/constants');
const Projects = require('../model/projects');
const Users = require('../model/users');

const getProjects = async (req, res, next) => {
  try {
    const email = req.user.email;
    const projects = await Projects.getProjectsOfUser(email);

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
    const email = req.user.email;
    const project = await Projects.addProject({
      ...req.body,
      owners: email,
    });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, project });
  } catch (error) {
    next(error);
  }
};

const removeProject = async (req, res, next) => {
  try {
    const email = req.user.email;
    const { projectId } = req.params;
    const filteredProjects = await Projects.deleteProject(projectId, email);

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
      project: filteredProjects,
    });
  } catch (error) {
    next(error);
  }
};

const updateProjectName = async (req, res, next) => {
  try {
    const email = req.user.email;
    const { projectId } = req.params;

    const updatedProject = await Projects.updateProject(
      email,
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
      project: { name },
    });
  } catch (error) {
    next(error);
  }
};

const inviteUser = async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const { projectId } = req.params;
    const user = await Users.findByEmail(req.body.email);

    if (!user) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'User with such email not exists',
      });
    }

    const { email } = user;
    const updatedProject = await Projects.addUserToProject(
      userEmail,
      projectId,
      email,
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
      user: { email },
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
