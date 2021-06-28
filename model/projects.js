const Project = require('./schemas/project');

const addProject = async body => {
  const result = await Project.create(body);

  return result;
};

const deleteProject = async (userId, projectId) => {
  const result = await Project.findOneAndRemove(
    { _id: projectId, owner: userId });
  return result;
};

const addSprint = async (projectId, sprint) => {
  try {
    const result = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { sprints: sprint },
      },
      { new: true },
    );

    return result;
  } catch (error) {
    return false;
  }
};

module.exports = { addProject, deleteProject, addSprint };
