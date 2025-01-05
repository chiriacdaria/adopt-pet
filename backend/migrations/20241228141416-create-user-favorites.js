module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_favorites', {
      favorite_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',   // Refers to the `users` table
          key: 'id',        // Reference the `id` column in the `users` table
        },
        onDelete: 'CASCADE',  // If a user is deleted, remove their favorites
        allowNull: false,
      },
      animal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'animals', // Refers to the `animals` table
          key: 'id',         // Reference the `id` column in the `animals` table
        },
        onDelete: 'CASCADE',  // If an animal is deleted, remove it from favorites
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_favorites');
  },
};
