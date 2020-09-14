const { TransactionCategory } = require('../models/index');

const createBasicCategories = async (name, type) => {
  await TransactionCategory.create({
    name,
    type,
  });
};

const findAllCategories = async () => {
  return await TransactionCategory.findAll({
    raw: true,
  });
};

const findCategoryByName = async name =>
  await TransactionCategory.findOne({ where: { name }, raw: true });

module.exports = {
  createBasicCategories,
  findAllCategories,
  findCategoryByName,
};
