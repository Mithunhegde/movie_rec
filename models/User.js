const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other fields as needed
});

module.exports = User;
