const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize');
const TransactionCategory = require('./transactionCategory');

const Transaction = sequelize.define(
  'Transaction',
  {
    date: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false,
      validate: {
        notNull: { msg: 'date is required' },
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notNull: { msg: 'type is required' },
        notEmpty: true,
      },
    },
    categoryId: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notNull: { msg: 'categoryId is required' },
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notNull: { msg: 'userId is required' },
        notEmpty: true,
      },
    },
    comment: {
      type: DataTypes.STRING,
      unique: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: false,
      validate: {
        notNull: { msg: 'ammount is required' },
        notEmpty: true,
      },
    },
    balanceAfter: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

Transaction.associate = () => {
  Transaction.belongsTo(TransactionCategory);
};

module.exports = Transaction;
