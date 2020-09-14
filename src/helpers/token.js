const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateToken = id => {
  const payload = { id };
  return jwt.sign(payload, process.env.SECRET_WORD, {
    expiresIn: '1d',
  });
};

const decodeToken = token => {
  const payloadWithSessionId = jwt.decode(token);
  return payloadWithSessionId;
};

module.exports = { generateToken, decodeToken };
