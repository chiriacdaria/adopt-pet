// models/index.js
const sequelize = require('../db/connection'); // Import the database connection
const { DataTypes, Op } = require('sequelize');
const User = require('./user')(sequelize, DataTypes); // Import User model
const Animal = require('./animal')(sequelize, DataTypes); // Import Animal model
const UserFavorites = require('./userFavorites')(sequelize,DataTypes);
const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User,
  Animal,
  UserFavorites,
  Op
};

module.exports = db;
