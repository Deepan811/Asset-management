// models/AssetCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const AssetCategory = sequelize.define('AssetCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  // Add other attributes as needed.
});

module.exports = AssetCategory;
