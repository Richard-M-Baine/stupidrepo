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

// ──────────────── MIDDLEWARE SETUP ────────────────
console.log("🛠️ Initializing middleware...");

app.use(cors({
  origin: "http://localhost:3000", // Update for production frontend if needed
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Session restore
app.use(restoreUser);

// ──────────────── API ROUTES ────────────────
console.log("📡 Setting up API routes...");

app.use("/api", routes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

// ──────────────── SERVE REACT IN PRODUCTION ────────────────
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '/frontend/build');
  console.log("🧱 Production mode: Serving React frontend...");
  console.log(`✅ Frontend build served from: ${buildPath}`);

  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("✅ Server is running! [DEV MODE]");
  });
}

// ──────────────── ERROR HANDLER ────────────────
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// ──────────────── START SERVER ────────────────
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("🗄️  Database connected!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ──────────────── DEBUG LOGS ON EXIT ────────────────
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
