require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DBDATABASE,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'postgres',
    port: process.env.DBPORT,
    logging: (...msg) =>
      console.log(
        'PostgreSQL: ',
        msg[1].type,
        msg[1].name ? msg[1].name : null,
      ),
  },
);

module.exports = sequelize;
