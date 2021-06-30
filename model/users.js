const User = require('./schemas/user');
const Project = require('./schemas/project');

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async options => {
  const user = new User(options);

  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
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
  findById,
  findByEmail,
  create,
  updateToken,
  addUserToProject,
};
