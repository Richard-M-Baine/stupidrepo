const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../models');

const { secret, expiresIn } = jwtConfig;
const JWT_SECRET = secret

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user;
    next();
  });
};

// no expires in?


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
      { data: user.toSafeObject() },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );
    
  
    const isProduction = process.env.NODE_ENV === "production";
  
    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });
  
    return token;
  };

  const restoreUser = (req, res, next) => {
    

    const { token } = req.cookies;
    

  
    req.user = null;
  
    if (!token) return next(); // If no token, just move on
  
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log the error
        return next();
      }
  
      try {
        const { id } = jwtPayload.data;
     
        req.user = await User.scope('currentUser').findByPk(id);
    
      } catch (e) {

        res.clearCookie('token');
        return next();
      }
  
      if (!req.user) {

        res.clearCookie('token');
      }
  
      return next();
    });
  };

  const requireAuth = function (req, _res, next) {

    if (req.user) return next();
  
    const err = new Error('Forbidden');
    err.title = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth, authenticateToken };



