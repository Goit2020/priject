const express = require('express');
const categoryRouter = express.Router();
const { getCategories } = require('../controllers/transactionCategory');
const { validateAuth } = require('../validation/auth');

categoryRouter.get('/', validateAuth, getCategories);

module.exports = categoryRouter;
