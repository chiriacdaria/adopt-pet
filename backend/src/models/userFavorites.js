// models/userFavorites.js
module.exports = (sequelize, DataTypes) => {
  const UserFavorites = sequelize.define('UserFavorites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // This will auto-generate IDs
  },
  favorite_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  animal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
}, {
  tableName: 'user_favorites',
  underscored: true,  // Ensures that the column names in the database use snake_case
});

  return UserFavorites;
};
