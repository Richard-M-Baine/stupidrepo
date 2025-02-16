require("dotenv").config();
const path = require("path"); // Add this line

module.exports = {
  development: {
    username: process.env.DB_USER || "default_user",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: path.join(__dirname, "../database/database.sqlite") // Define storage path for SQLite
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: ":memory:" // In-memory database for testing
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite") // Define storage for production
  }
};
