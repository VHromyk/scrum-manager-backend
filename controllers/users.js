const Users = require('../model/users');
const HttpCode = require('../helpers/constants');

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      });
    }

    const newUser = await Users.create(req.body);
    const { email } = newUser;

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
          email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
