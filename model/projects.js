const Project = require('./schemas/project');
const Users = require('./schemas/user');

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

const getOwnersOfProject = async projectId => {
  const projectOwners = await Project.findById(projectId);
  const { owners } = projectOwners;
  const usersData = await Users.find({ _id: { $in: owners } });
  const result = usersData.map(({ email }) => email);

  return result;
};

module.exports = {
  addProject,
  deleteProject,
  updateProject,
  getProjectsOfUser,
  addUserToProject,
  getOwnersOfProject,
};
