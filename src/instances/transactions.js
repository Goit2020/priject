const { findUserById } = require('../instances/user');
const { findAllCategories } = require('../instances/transactionCategories');
const { Transaction } = require('../models/index');

const calculateBalanceAfter = async (userBalance, amount, type) => {
  let balanceAfter = 0;
  if (type === 'Expense') {
    balanceAfter = userBalance - amount;
  } else if (type === 'Income') {
    balanceAfter = userBalance + amount;
  } else {
    balanceAfter = userBalance;
  }

  return balanceAfter.toFixed(2);
};

const deleteTransaction = async id =>
  await Transaction.destroy({ where: { id } }, { raw: true });

module.exports = {
  calculateBalanceAfter,

  deleteTransaction,
};
