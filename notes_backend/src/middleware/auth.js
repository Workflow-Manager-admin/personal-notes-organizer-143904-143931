// PUBLIC_INTERFACE
/**
 * Authentication middleware for Express routes.
 * Checks for Bearer token, verifies JWT, attaches user info to req.user.
 */
const authService = require('../services/auth');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'fail', message: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = authService.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ status: 'fail', message: 'Invalid or expired token' });
  }
  req.user = decoded;
  next();
}

module.exports = authenticateJWT;
