const express = require('express');
const authRouter = express.Router();
const { signUp, signIn, signOut } = require('../controllers/auth');
const {
  validateSignIn,
  validateAuth,
  validateSignUp,
} = require('../validation/auth');

authRouter.post('/sign-up/', validateSignUp, signUp);
authRouter.post('/sign-in/', validateSignIn, signIn);
authRouter.post('/sign-out/', validateAuth, signOut);

module.exports = authRouter;
