const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize');
const Transaction = require('./transaction');

const TransactionCategory = sequelize.define(
  'TransactionCategory',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'name is required' },
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

TransactionCategory.associate = () => {
  TransactionCategory.hasMany(Transaction);
};

module.exports = TransactionCategory;
