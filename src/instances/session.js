const Session = require('../models/session');

const createSession = async userId =>
  await Session.create({
    userId,
  });

const deleteSession = async id =>
  await Session.destroy({
    where: { id },
    truncate: true,
  });
module.exports = { createSession, deleteSession };
