const Project = require('./schemas/project');
const Sprint = require('./schemas/sprint');
const Task = require('./schemas/task');

const addProject = async body => {
  const result = await Project.create(body);

  return result;
};

const addSprint = async body => {
  const result = await Sprint.create(body);

  return result;
};

const addTask = async body => {
  const result = await Task.create(body);

  return result;
};

module.exports = { addProject, addSprint, addTask };
