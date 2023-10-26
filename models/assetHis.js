// models/HistoryEvent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const HistoryEvent = sequelize.define('HistoryEvent', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = HistoryEvent;
