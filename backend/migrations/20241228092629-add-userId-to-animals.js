'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('animals', 'user_id', {  // Use snake_case for user_id
      type: Sequelize.INTEGER,
      references: {
        model: 'users',  // Use the lowercase 'users' table name
        key: 'id',
      },
      allowNull: false, // Enforce that every animal is linked to a user
      onDelete: 'CASCADE', // Optionally handle cascading deletes if a user is deleted
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('animals', 'user_id');  // Use snake_case for user_id
  },
};
