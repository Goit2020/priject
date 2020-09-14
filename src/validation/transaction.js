const Joi = require('joi');

const validateCreateTransaction = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.string().required(),
    type: Joi.string().valid('Income', 'Expense').required(),
    categoryId: Joi.string().required(),
    comment: Joi.string().empty(''),
    amount: Joi.number().precision(2).required().strict(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) return res.status(400).send(validation.error.message);
  next();
};

const validateGetTransactionsSummary = (req, res, next) => {
  const schema = Joi.object({
    year: Joi.string().regex(/^[0-9]+$/),
    month: Joi.string().regex(/^([1-9]|1[0-2])$/),
  }).with('month', 'year');

  const validation = schema.validate(req.query);

  if (validation.error) return res.status(400).send(validation.error.message);
  next();
};

module.exports = {
  validateCreateTransaction,
  validateGetTransactionsSummary,
};
