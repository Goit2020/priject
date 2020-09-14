const { Op } = require('sequelize');
const sequelize = require('../helpers/sequelize');
const { Transaction } = require('../models/index');
const { calculateBalanceAfter } = require('../instances/transactions');
const { updateBalance } = require('../instances/user');

const createTransaction = async (req, res, next) => {
  try {
    const { date, type, categoryId, comment, amount } = req.body;

    const userBalance = res.locals.user.balance;

    const balanceAfter = await calculateBalanceAfter(userBalance, amount, type);

    const transaction = await Transaction.create({
      date,
      type,
      categoryId,
      userId,
      comment,
      amount,
      balanceAfter,
    });
    await updateBalance(userId, balanceAfter);

    return res.status(201).send({
      transaction: {
        id: transaction.id,
        date: transaction.date,
        type: transaction.type,
        categoryId: transaction.categoryId,
        userId: transaction.userId,
        comment: transaction.comment,
        amount: transaction.amount,
        balanceAfter: transaction.balanceAfter,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getTransactionsController = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    const transactionsData = await Transaction.findAll({
      where: { userId: userId.toString() },
      raw: true,
    });

    return res.status(200).json(transactionsData);
  } catch (err) {
    next(err);
  }
};

const getTransactionsSummary = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    let year = req.query.year;
    let month = req.query.month;

    const testTransactionsData = await Transaction.findAll({
      where: {
        userId: userId.toString(),

        date: {
          [Op.gte]: new Date(
            year ? year : 1970,
            month ? Number(month) - 1 : 0,
            1,
          ),
          [Op.lt]: new Date(
            year ? year : 2099,
            month ? Number(month) : 11,
            month ? 1 : 31,
          ),
        },
      },

      attributes: [
        'categoryId',
        'type',
        [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
      ],
      group: ['Transaction.type', 'Transaction.categoryId'],
      raw: true,
    });

    return res.status(200).json({
      stats: testTransactionsData,
      month: month ? month : 'all',
      year: year ? year : 'all',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTransaction,
  getTransactionsController,
  getTransactionsSummary,
};
