const { createUser, findUserByEmail } = require('../instances/user');
const { createSession, deleteSession } = require('../instances/session');
const { setPasswordHash, checkUserPassword } = require('../helpers/encryption');
const { generateToken } = require('../helpers/token');

const signUp = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await findUserByEmail(email);
    if (user) {
      return res.status(409).send({
        message: 'Email is in use',
      });
    }

    const passwordHash = await setPasswordHash(password);
    const newUser = await createUser({
      username,
      email,
      passwordHash,
    });

    const newSession = await createSession(newUser.id);

    const token = generateToken(newSession.dataValues.id);

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(201).send({
      user: {
        username: newUser.username,
        email: newUser.email,
        balance: newUser.balance,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).send({
        message: 'User does not exist',
      });
    }

    if (!(await checkUserPassword(password, user.passwordHash))) {
      return res.status(403).send({
        message: 'Incorrect password',
      });
    }

    const newSession = await createSession(user.id);

    const token = generateToken(newSession.dataValues.id);

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    const { id } = res.locals.user;
    await deleteSession(id);

    res.clearCookie('token', { path: '/' });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, signOut };
