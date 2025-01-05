module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('animals');
    
    if (!tableDescription.contact_number) {
      await queryInterface.addColumn('animals', 'contact_number', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'N/A',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('animals', 'contact_number');
  },
};
