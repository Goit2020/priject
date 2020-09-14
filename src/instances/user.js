const User = require('../models/user');

const createUser = async ({ username, email, passwordHash, balance }) =>
  await User.create({
    username,
    email,
    passwordHash,
    balance,
  });

const findAllUsers = async () =>
  await User.findAll({
    raw: true,
  });

const findUserById = async id =>
  await User.findOne({ where: { id }, raw: true });

const findUserByEmail = async email =>
  await User.findOne({ where: { email }, raw: true });

const deleteUser = async id =>
  await User.destroy({ where: { id } }, { raw: true });

const deleteAll = async () =>
  await User.destroy({
    where: {},
    truncate: true,
  });

const updateBalance = async (id, balance) =>
  await User.update({ balance }, { where: { id } });

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
  deleteUser,
  deleteAll,
  updateBalance,
};
