require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const routes = require("./routes");
const authRoutes = require('./routes/loginRoutes');
const protectedRoutes = require('./routes/userRoutes');
const { restoreUser } = require('./middleware/authenticate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON body first
app.use(cookieParser()); // Parse cookies
app.use(session({
  store: new SQLiteStore({ db: 'database.sqlite', dir: path.join(__dirname, 'database') }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Set to `true` in production
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

app.use(restoreUser); // Move this AFTER session & cookieParser

app.use("/api", routes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

// Global error handler to log full errors
app.use((err, req, res, next) => {
  console.error("ERROR:", err.stack); // Print full error stack
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
  console.log(`Server running on port ${PORT}`);
});
