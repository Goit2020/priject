const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express'); //swagger
const swaggerDocument = require('./docs'); //swagger
const { shouldSendSameSiteNone } = require('should-send-same-site-none');

const Session = require('./models/index').Session;
const User = require('./models/index').User;
const Transaction = require('./models/index').Transaction;
const TransactionCategory = require('./models/index').TransactionCategory;

const { authRouter, categoryRouter, transactionsRouter } = require('./routes');
const { initCategories } = require('./controllers/transactionCategory');

const errorHandler = (err, req, res, next) =>
  res.status(500).send({ message: err.stack });

const initRoutes = () => {
  app.use('/transaction-categories', categoryRouter);
  app.use('/transactions', transactionsRouter);
};

const startServer = async port => {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  app.use(express.json({ limit: '25kb' }));
  app.use(cookieParser());
  app.use(shouldSendSameSiteNone);
  app.use(morgan('dev'));

  await Session.sync();
  await User.sync();
  await TransactionCategory.sync();
  await Transaction.sync();

  initCategories();
  initRoutes();

  require('./config/passport');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger
  app.use('/auth', authRouter);
  app.use(errorHandler);

  return app.listen(port);
};

module.exports = startServer;
