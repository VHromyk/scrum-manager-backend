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

const deleteProject = async (projectId, userId) => {
  const result = await Project.findOneAndRemove({
    _id: projectId,
    owners: { _id: userId },
  });

  return result;
};

const updateProject = async (userId, projectId, body) => {
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owners: { _id: userId },
    },
    { ...body },
    { new: true },
  );
  return result;
};

module.exports = {
  addProject,
  addSprint,
  addTask,
  deleteProject,
  updateProject,
};
