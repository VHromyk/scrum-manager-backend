const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const createToken = userId => {
  const payload = { id: userId };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });

  return token;
};

module.exports = createToken;
