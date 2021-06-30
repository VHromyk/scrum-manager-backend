const HttpCode = require('../helpers/constants');
const Tasks = require('../model/tasks');

const createTask = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const task = await Tasks.addTask({ ...req.body, mainSprint: sprintId });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { task } });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const tasks = await Tasks.getTasksOfSprint(sprintId);

    if (!tasks) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Tasks not found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { tasks },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks };
