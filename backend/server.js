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
const cors = require('cors');
const fs = require('fs');



const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup (adjust origin in dev)
app.use(cors({
  origin: "http://localhost:3000", // In production, set to your actual frontend domain
  credentials: true
}));

// JSON + Cookies
app.use(express.json());
app.use(cookieParser());



// Restore user if session/auth is used
app.use(restoreUser);

app.get("/", (req, res) => {
  res.send("Server is running! Its Alive!");
});


// API routes
app.use("/api", routes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

// ---------- Serve Frontend in Production ----------
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend build folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Fallback to React's index.html for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
  });
}

// ---------- Error Handler ----------
app.use((err, req, res, next) => {
  console.error("ERROR:", err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// ---------- Start Server ----------
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  const logPath = '/root/.npm/_logs';
  try {
    const files = fs.readdirSync(logPath);
    const debugFiles = files.filter(f => f.includes('debug'));
    if (debugFiles.length > 0) {
      const lastFile = debugFiles.sort().pop();
      const logContent = fs.readFileSync(path.join(logPath, lastFile), 'utf-8');
      console.log("---- DEBUG LOG ----\n", logContent);
    } else {
      console.log("No debug logs found in", logPath);
    }
  } catch (err) {
    console.error("Could not read debug log:", err.message);
  }
  process.exit();
});
