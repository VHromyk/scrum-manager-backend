const Joi = require('joi');

const schemaCreateProject = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  description: Joi.string().min(10).max(100),
});

const schemaCreateSprint = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  startDate: Joi.string().min(3).max(30).required(),
  duration: Joi.number().integer().required(),
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

module.exports.validateCreateSprint = (req, _res, next) => {
  return validate(schemaCreateSprint, req.body, next);
};
