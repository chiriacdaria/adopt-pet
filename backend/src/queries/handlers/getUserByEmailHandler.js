// queries/handlers/getUserByEmailHandler.js

const { User } = require('../../models'); // Sequelize model

// Query handler to get a user by email
const getUserByEmailHandler = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = getUserByEmailHandler;
