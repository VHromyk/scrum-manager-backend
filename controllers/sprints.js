const HttpCode = require('../helpers/constants');
const Sprints = require('../model/sprints');

const createSprint = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const sprint = await Sprints.addSprint({
      ...req.body,
      mainProject: projectId,
    });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, sprint });
  } catch (error) {
    next(error);
  }
};

const getSprints = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const sprints = await Sprints.getSptintsOfProject(projectId);

    if (!sprints) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Sprints not found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      sprints,
    });
  } catch (error) {
    next(error);
  }
};

const updateSprintName = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const newName = req.body;
    const updatedSprint = await Sprints.updateSprint(sprintId, newName);

    if (!updatedSprint) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Sprint not found',
      });
    }

    const { name } = updatedSprint;

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      sprint: { name },
    });
  } catch (error) {
    next(error);
  }
};

const removeSprint = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const filteredSprints = await Sprints.deleteSprint(sprintId);

    if (!filteredSprints) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      sprint: filteredSprints,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSprint, getSprints, updateSprintName, removeSprint };
