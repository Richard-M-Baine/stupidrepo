require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "default_user",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "sqlite"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "sqlite"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "sqlite"
  }
};
