const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { findUserById } = require('../instances/user');
require('dotenv').config();

const params = {
  secretOrKey: process.env.SECRET_WORD,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await findUserById(payload.id);
      if (!user) {
        return done(new Error('User is not found'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, { id: user.id });
    } catch (err) {
      done(err);
    }
  }),
);
