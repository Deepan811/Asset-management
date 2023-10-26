// models/Asset.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Asset = sequelize.define('Asset', {
  serialNumber: DataTypes.STRING,
  make: DataTypes.STRING,
  model: DataTypes.STRING,
  assetType: DataTypes.STRING,
  // Other fields as needed
});

module.exports = Asset;
