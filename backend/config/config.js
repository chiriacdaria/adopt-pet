require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // 'db'
    dialect: "postgres",
    migrationStorageTableName: 'SequelizeMeta', // table storing migrations metadata
    migrations: {
      path: './migrations', // ensure this points to the correct path
    },
  },
};
