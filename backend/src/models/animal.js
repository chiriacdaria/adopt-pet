module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define('Animal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_adopted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    added_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    adopted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'users',key: 'id'}
    }, // Ensure userId is defined
      adopter_id: { // New field for adopter
      type: DataTypes.INTEGER,
      allowNull: true,  // Can be null before adoption
      references: { model: 'users', key: 'id' },
    },

  }, {
    tableName: 'animals',
    underscored: true,
  });

  Animal.associate = (models) => {
    Animal.belongsToMany(models.User, {
      through: 'user_favorites',
      foreignKey: 'animal_id', // Foreign key for the animal in the junction table
      otherKey: 'favorite_user_id', // Foreign key for the user in the junction table
    });
     Animal.belongsTo(models.User, {
      foreignKey: 'adopter_id', // The adopter of the animal
      as: 'adopter',
    });
  };

  return Animal;
};
