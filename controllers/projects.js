const HttpCode = require('../helpers/constants');
const { addProject } = require('../model/projects');

const createProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const project = await addProject({ ...req.body, owners: userId });

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { project } });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject };
