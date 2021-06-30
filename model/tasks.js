const Task = require('./schemas/task');

const addTask = async body => {
  const result = await Task.create(body);

  return result;
};

const getTasksOfSprint = async sprintId => {
  try {
    const result = await Task.find({ mainSprint: sprintId }).populate({
      path: 'mainSprint',
      select: 'name date duration _id',
    });

    return result;
  } catch (error) {
    return false;
  }
};

module.exports = { addTask, getTasksOfSprint };
