const Joi = require('joi');

const schemaCreateProject = Joi.object({
  name: Joi.string().min(4).max(40).required(),
  description: Joi.string().min(4).max(100),
});

const schemaUpdateProjectName = Joi.object({
  name: Joi.string().min(4).max(40).required(),
});

const schemaInviteUser = Joi.object({
  email: Joi.string().min(4).max(20).required(),
});

const schemaCreateSprint = Joi.object({
  name: Joi.string().min(4).max(40).required(),
  startDate: Joi.string().min(3).max(30).required(),
  endDate: Joi.string().min(3).max(30).required(),
  duration: Joi.number().integer().required(),
});

const schemaCreateTask = Joi.object({
  name: Joi.string().min(4).max(40).required(),
  scheduledHours: Joi.number().integer().min(1).max(24).required(),
  spentTime: Joi.number().integer().min(1).max(24),
  taskDate: Joi.string().min(1).max(20).required(),
});

const schemaSearchTask = Joi.object({
  searchName: Joi.string().min(1).max(40).required(),
});

const schemaSpentTimeTask = Joi.object({
  spentTime: Joi.number().integer().min(1).max(24).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    next({ status: 400, message: error.message.replace(/"/g, '') });
  }
};

module.exports.validateCreateProject = (req, _res, next) => {
  return validate(schemaCreateProject, req.body, next);
};

module.exports.validateUpdateProjectName = (req, _res, next) => {
  return validate(schemaUpdateProjectName, req.body, next);
};

module.exports.validateInviteUser = (req, _res, next) => {
  return validate(schemaInviteUser, req.body, next);
};

module.exports.validateCreateSprint = (req, _res, next) => {
  return validate(schemaCreateSprint, req.body, next);
};

module.exports.validateCreateTask = (req, _res, next) => {
  return validate(schemaCreateTask, req.body, next);
};

module.exports.validateSearchTask = (req, _res, next) => {
  return validate(schemaSearchTask, req.body, next);
};

module.exports.validateSpentTimeTask = (req, _res, next) => {
  return validate(schemaSpentTimeTask, req.body, next);
};
