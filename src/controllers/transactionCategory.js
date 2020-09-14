const fs = require('fs');
const path = require('path');

const {
  createBasicCategories,
  findAllCategories,
  findCategoryByName,
} = require('../instances/transactionCategories');

const categoryPath = path.join(__dirname, '../db/categories.json');

const { promises: fsPromises } = fs;

const initCategories = async () => {
  try {
    const data = await fsPromises.readFile(categoryPath, 'utf-8');
    const categoriesData = JSON.parse(data);

    categoriesData.forEach(async ({ name, type }) => {
      const existingCategory = await findCategoryByName(name);

      if (existingCategory === null) {
        await createBasicCategories(name, type);
      }
    });
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categoriesData = await findAllCategories();
    return res.status(200).json(categoriesData);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  initCategories,
  getCategories,
};
