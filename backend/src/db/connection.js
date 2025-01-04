const { Sequelize } = require('sequelize');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db', 
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER, // Should be defined in your .env file
  password: process.env.DB_PASSWORD, // Should be defined in your .env file
  database: process.env.DB_NAME, // Should be defined in your .env file
});

module.exports = sequelize;
