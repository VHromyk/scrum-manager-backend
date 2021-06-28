const { nanoid } = require('nanoid');
const HttpCode = require('../helpers/constants');
const { addProject, addSprint } = require('../model/projects');

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
    const newSprint = {
      id: nanoid(),
      ...req.body,
      tasks: [],
    };
    const result = await addSprint(projectId, newSprint);

    if (!result) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Invalid credentials',
      });
    }

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: { sprint: newSprint },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, createSprint };
