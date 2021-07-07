const Project = require('./schemas/project');
const Users = require('./schemas/user');

const getProjectsOfUser = async email => {
  try {
    const result = await Project.find({ owners: email });

    return result;
  } catch (error) {
    return false;
  }
};

const addProject = async body => {
  const result = await Project.create(body);

  return result;
};

const deleteProject = async (projectId, email) => {
  try {
    const result = await Project.findOneAndRemove({
      _id: projectId,
      owners: email,
    });

    return result;
  } catch (error) {
    return false;
  }
};

const updateProject = async (email, projectId, body) => {
  try {
    const result = await Project.findOneAndUpdate(
      {
        _id: projectId,
        owners: email,
      },
      { ...body },
      { new: true },
    );
    return result;
  } catch (error) {
    return false;
  }
};

const addUserToProject = async (userEmail, projectId, newUserEmail) => {
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owners: userEmail,
    },
    { $addToSet: { owners: newUserEmail } },
    { new: true },
  );

  return result;
};

const getOwnersOfProject = async projectId => {
  const projectOwners = await Project.findById(projectId);
  const { owners } = projectOwners;

  return owners;
};

module.exports = {
  addProject,
  deleteProject,
  updateProject,
  getProjectsOfUser,
  addUserToProject,
  getOwnersOfProject,
};
