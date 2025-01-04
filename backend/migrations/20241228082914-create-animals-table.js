'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animals', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_adopted: {  // Use snake_case for is_adopted
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      registration_date: {  // Use snake_case for registration_date
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      added_at: {  // Use snake_case for added_at
        type: Sequelize.DATE,
        allowNull: true,
      },
      adopted_at: {  // Use snake_case for adopted_at
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {  // Use snake_case for created_at
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {  // Use snake_case for updated_at
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('animals');
  },
};
