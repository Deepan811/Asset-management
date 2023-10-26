const Sequelize = require('sequelize');
const sequelize = require("../database/connection");

const Employee = sequelize.define('Employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Employee;
