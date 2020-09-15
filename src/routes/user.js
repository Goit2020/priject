const express = require('express');
const userRouter = express.Router();
const { getUser } = require('../controllers/user');
const { validateAuth } = require('../validation/auth');

userRouter.get('/', validateAuth, getUser);

module.exports = userRouter;
