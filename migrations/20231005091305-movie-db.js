'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true, // Set to false to prevent auto-incrementing
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      genre: {
        type: Sequelize.TEXT,
      },
      plot: {
        type: Sequelize.TEXT,
      },
      poster: {
        type: Sequelize.TEXT,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  },
};
