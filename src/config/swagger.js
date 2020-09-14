require('dotenv').config();

module.exports = {
  swagger: {
    host: process.env.PORT_SERVER,
    schemes: ['http'],
  },
};
