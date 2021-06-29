const Project = require('./schemas/project');
const Sprint = require('./schemas/sprint');
const Task = require('./schemas/task');

const getProjectsOfUser = async userId => {
  const result = await Project.find({ owners: userId });

  return result;
};

const addProject = async body => {
  const result = await Project.create(body);

  return result;
};

const addSprint = async body => {
  const result = await Sprint.create(body);

  return result;
};

const getSptintsOfProject = async (userId, projectId) => {
  try {
    // Checking if the user has access to the project
    const validation = await Project.findOne({
      _id: projectId,
      owners: userId,
    });

    if (!validation) {
      return false;
    }

    const result = await Sprint.find({ mainProject: projectId }).populate({
      path: 'mainProject',
      select: 'name description -_id',
    });

    return result;
  } catch (error) {
    return false;
  }
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

const addUserToProject = async (userId, projectId, newUserId) => {
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owners: { _id: userId },
    },
    { $addToSet: { owners: newUserId } },
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
  addUserToProject,
  getProjectsOfUser,
  getSptintsOfProject,
};
