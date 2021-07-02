const HttpCode = require('../helpers/constants');
const Tasks = require('../model/tasks');

const createTask = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const task = await Tasks.addTask({ ...req.body, mainSprint: sprintId });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, task });
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
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const findTaskByName = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const { searchName } = req.body;
    const task = await Tasks.getTaskByName(sprintId, searchName);

    if (!task) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Task not found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const filteredTasks = await Tasks.deleteTask(taskId);

    if (!filteredTasks) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      task: filteredTasks,
    });
  } catch (error) {
    next(error);
  }
};

const changeSpentTime = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const time = req.body;
    const updatedTask = await Tasks.updateSpentTime(taskId, time);

    if (!updatedTask) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  findTaskByName,
  removeTask,
  changeSpentTime,
};
