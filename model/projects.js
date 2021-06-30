const Project = require('./schemas/project');

const getProjectsOfUser = async userId => {
  try {
    const result = await Project.find({ owners: userId });

    return result;
  } catch (error) {
    return false;
  }
};

const addProject = async body => {
  const result = await Project.create(body);

  return result;
};

const deleteProject = async (projectId, userId) => {
  try {
    const result = await Project.findOneAndRemove({
      _id: projectId,
      owners: { _id: userId },
    });

    return result;
  } catch (error) {
    return false;
  }
};

const updateProject = async (userId, projectId, body) => {
  try {
    const result = await Project.findOneAndUpdate(
      {
        _id: projectId,
        owners: { _id: userId },
      },
      { ...body },
      { new: true },
    );
    return result;
  } catch (error) {
    return false;
  }
};

module.exports = {
  addProject,
  deleteProject,
  updateProject,
  getProjectsOfUser,
};
