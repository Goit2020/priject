const express = require('express');
const transactionsRouter = express.Router();
const { validateAuth } = require('../validation/auth');

const {
  createTransaction,
  getTransactionsController,
  getTransactionsSummary,
} = require('../controllers/transactions/');
const {
  validateCreateTransaction,
  validateGetTransactionsSummary,
} = require('../validation/transaction/');

transactionsRouter.post(
  '/',
  validateAuth,
  validateCreateTransaction,
  createTransaction,
);

transactionsRouter.get('/', validateAuth, getTransactionsController);
transactionsRouter.get(
  '/summary/',
  validateAuth,
  validateGetTransactionsSummary,
  getTransactionsSummary,
);

module.exports = transactionsRouter;
