// commands/handlers/registerUserHandler.js

const bcrypt = require('bcrypt');
const { User } = require('../../models'); // Sequelize model

// Command handler to register a user
const registerUserHandler = async (email, password, confirmPassword) => {
  // Check if the passwords match
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

	if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
  throw new Error('Invalid email format');
}

  // Check if the email is already registered
  const existingUser = await User.findOne({ where: { email } });
if (existingUser) {
  throw new Error('Email already in use. Please use a different email.');
}


  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  return newUser;
};

module.exports = registerUserHandler;
