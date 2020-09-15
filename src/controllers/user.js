const { findUserById } = require('../instances/user');

const getUser = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    console.log(userId);
    const user = await findUserById(userId);
    console.log(user);

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        balance: user.balance,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser };
