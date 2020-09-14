const { swagger } = require('../config/swagger');
const { authEndpoints, authDefinitions } = require('./auth.docs');
const { categoryEndpoints, categoryDefinitions } = require('./category.docs');
const {
  transactionEndpoints,
  transactionDefinitions,
} = require('./transactions.docs');

const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: '',
    version: '1.0.0',
    title: 'Raschitalochka Docs',
    contact: {
      email: 'saashen.kyiv@gmail.com',
    },
  },
  host: swagger.host,
  basePath: '/',
  tags: [],
  schemes: swagger.schemes,
  paths: {
    ...authEndpoints,
    ...categoryEndpoints,
    ...transactionEndpoints,
  },
  definitions: {
    ...authDefinitions,
    ...categoryDefinitions,
    ...transactionDefinitions,
  },
};

module.exports = swaggerDocument;
