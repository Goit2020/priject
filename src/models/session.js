const sequelize = require('../helpers/sequelize');
const { DataTypes } = require('sequelize');

const Session = sequelize.define('Session', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Session;
