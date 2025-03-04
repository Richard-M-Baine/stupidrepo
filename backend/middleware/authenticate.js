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
      maxAge: expiresIn * 1000, // Convert seconds to milliseconds
      httpOnly: true,  // Prevent client-side access (security)
      secure: isProduction, // Only use secure cookies in production
      sameSite: isProduction ? "Lax" : "Strict" // CSRF protection
  });

  return token;
};

const restoreUser = async (req, res, next) => {
  console.log("req.session.user:", req.session.user);
  if (!req.session.user) {
    return next(); // No user session found, move on
  }

  try {
    
    const user = await User.findByPk(req.session.user.id);
    console.log('i am user.id ',user.id)
    if (user) req.user = user;
  } catch (error) {
    console.error("Session restore error:", error);
  }

  next();
};



  const requireAuth = function (req, _res, next) {
    console.log("Session in requireAuth:", req.session);
    console.log("req.user in requireAuth:", req.user);
    if (req.user) return next();
  
    const err = new Error('Forbidden');
    err.title = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth, authenticateToken };



