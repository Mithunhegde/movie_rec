const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, // Set to false to prevent auto-incrementing
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  plot: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  poster: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
  // Add other fields as needed
});

module.exports = Movie;
