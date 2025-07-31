const authService = require('../services/auth');

// PUBLIC_INTERFACE
/**
 * Auth Controller for user registration and login.
 */
class AuthController {
  /**
   * User registration endpoint.
   * req.body: { username, password }
   */
  async register(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ status: 'fail', message: 'Username and password required' });
      }
      const result = await authService.register(username, password);
      if (!result.success) {
        return res.status(409).json({ status: 'fail', message: result.message });
      }
      return res.status(201).json({ status: 'ok', message: 'User registered' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  /**
   * User login endpoint.
   * req.body: { username, password }
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ status: 'fail', message: 'Username and password required' });
      }
      const result = await authService.login(username, password);
      if (!result.success) {
        return res.status(401).json({ status: 'fail', message: result.message });
      }
      // Return JWT token
      return res.status(200).json({ status: 'ok', token: result.token });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new AuthController();
