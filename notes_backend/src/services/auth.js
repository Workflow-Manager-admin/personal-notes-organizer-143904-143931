const { User } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_please_override';

// PUBLIC_INTERFACE
/**
 * AuthService handles user registration and login logic.
 */
class AuthService {
  /**
   * Register a user.
   */
  async register(username, password) {
    const exists = await User.findOne({ where: { username } });
    if (exists) {
      return { success: false, message: 'Username already exists' };
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password_hash: hash });
    return { success: true };
  }

  /**
   * User login: returns JWT on success.
   */
  async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return { success: false, message: 'No user found' };
    }
    const correct = await bcrypt.compare(password, user.password_hash);
    if (!correct) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });
    return { success: true, token };
  }

  /**
   * Verify JWT and return decoded payload or null if invalid.
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}

module.exports = new AuthService();
