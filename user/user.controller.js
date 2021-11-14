const UserService = require('./user.service');
const AuthService = require('../auth/auth.service');

class UserController {
  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      await UserService.updatePassword(currentPassword, newPassword, req.user.id);
      const cookieOptions = AuthService.createCookieOptions();
      const token = AuthService.getToken(req.user.id);
      res.cookie('jwt', token, cookieOptions);
      res.status(200).json({
        message: 'password was successfully changed',
      });
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { password } = req.body;
      await UserService.delete(password, req.user.id);
      res.cookie('jwt', { expires: Date.now() });
      res.status(200).json({
        message: 'user was deleted',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
