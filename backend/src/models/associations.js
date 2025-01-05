// /models/associations.js
const { Animal, User } = require('./index');  // Import models from index

// Define associations
Animal.belongsTo(User, { foreignKey: 'userId' });  // Animal has a foreign key to User
User.hasMany(Animal, { foreignKey: 'userId' });    // User can have multiple animals
