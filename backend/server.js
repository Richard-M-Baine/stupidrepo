require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const routes = require("./routes");
const authRoutes = require('./routes/loginRoutes');
const protectedRoutes = require('./routes/userRoutes');
const { restoreUser } = require('./middleware/authenticate');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(restoreUser); 


app.use(express.json());



app.use("/api", routes);

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
