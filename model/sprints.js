const Sprint = require('./schemas/sprint');

const addSprint = async body => {
  const result = await Sprint.create(body);

  return result;
};

const getSptintsOfProject = async projectId => {
  try {
    const result = await Sprint.find({ mainProject: projectId }).populate({
      path: 'mainProject',
      select: 'name description _id',
    });

    return result;
  } catch (error) {
    return false;
  }
};

const updateSprint = async (sprintId, body) => {
  try {
    const result = await Sprint.findByIdAndUpdate(
      sprintId,
      { ...body },
      { new: true },
    );
    return result;
  } catch (error) {
    return false;
  }
};

module.exports = { addSprint, getSptintsOfProject, updateSprint };
