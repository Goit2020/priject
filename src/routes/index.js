const authRouter = require('./auth');
const categoryRouter = require('./transactionsCategory');
const transactionsRouter = require('./transactions');
const userRouter = require('./user');
module.exports = { authRouter, categoryRouter, transactionsRouter, userRouter };
