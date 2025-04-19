const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../models');

const { secret, expiresIn } = jwtConfig;
const JWT_SECRET = secret

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;  // Read token from cookies

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
          console.error("JWT Verification Error:", err);
          return res.status(403).json({ error: 'Invalid token' });
      }

      req.user = decoded.data; // Store decoded user data in req.user
      next();
  });
};


// no expires in?


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  const token = jwt.sign(
      { data: user.toSafeObject() }, // Store only necessary user data
      secret,
      { expiresIn: parseInt(expiresIn) || "7d" } // Token valid for 7 days
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "Lax" : "Strict"
  });
  

  return token;
};

const restoreUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token in restoreUser:", token);
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const { id } = decoded.data;
    const user = await User.findByPk(id);

    if (user) {
      console.log("User found:", user.username);
      req.user = user;
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.error("restoreUser JWT verification error:", err);
  }

  next();
};





  const requireAuth = function (req, _res, next) {
    console.log('req.user',req.user)
    console.log('Cookies received:', req.cookies);

    if (req.user) return next();
  
    const err = new Error('Forbidden');
    err.title = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth, authenticateToken };



