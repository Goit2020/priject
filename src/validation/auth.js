const Joi = require('joi');
const { decodeToken } = require('../helpers/token');
const { Session, User } = require('../models/index');

validateSignUp = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    password: Joi.string().required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) return res.status(400).send(validation.error.message);

  next();
};

validateSignIn = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) return res.status(400).send(validation.error.message);

  next();
};

const validateAuth = async (req, res, next) => {
  try {
    const token = await req.cookies.token;

    if (!token) {
      console.log('no cookies');
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }

    const sessionId = decodeToken(token).id;

    const session = await Session.findOne({
      where: { id: sessionId },
      raw: true,
    });

    if (!session) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    userId = session.userId;

    const user = await User.findOne({ where: { id: userId }, raw: true });
    if (!user) {
      return res.status(400).send({
        message: 'Unknown user',
      });
    }

    res.locals.user = user;
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Unauthorized',
    });
  }
};

module.exports = {
  validateSignIn,
  validateAuth,
  validateSignUp,
};
