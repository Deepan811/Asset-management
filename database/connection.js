
const { Sequelize } = require('sequelize');


const config = require('../config');

const sequelize = new Sequelize({
  dialect: config.database.dialect, 
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
});

module.exports = sequelize;
