require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "your_db_name",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: null,
    database: "test_db",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  production: {
    // Railway injects DATABASE_URL, no need to parse each value
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for some cloud platforms like Railway
      }
    }
  }
};
