const bcrypt = require('bcryptjs');

async function setPasswordHash(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function checkUserPassword(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}

module.exports = { setPasswordHash, checkUserPassword };
