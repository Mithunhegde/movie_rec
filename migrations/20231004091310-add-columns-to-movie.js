'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Movies', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Movies', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Movies', 'createdAt');
    await queryInterface.removeColumn('Movies', 'updatedAt');
  },
};
