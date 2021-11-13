const UserService = require('../user/user.service');
const AuthService = require('./auth.service');
const sendMail = require('../utlis/sendMail');

class AuthContoller {
  async signUp(req, res, next) {
    try {
      const newUser = await UserService.create(req.body);
      const cookieOptions = AuthService.createCookieOptions();
      res.cookie('jwt', newUser.token, cookieOptions);
      res.status(201).json({
        data: newUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.signIn(email, password);
      const cookieOptions = AuthService.createCookieOptions();
      res.cookie('jwt', user.token, cookieOptions);
      res.status(200).json({
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const resetToken = await AuthService.forgotPassword(req.body.email);
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/auth/resetPassword/${resetToken}`;
      const message = `Forgot your password? Click the link ${resetURL}.
       If you didn't forget your password, please ignore this email`;

      await sendMail({
        email: req.body.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });

      res.status(200).json({
        message: 'Token send to email',
      });
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req, res, next) {}
}

module.exports = new AuthContoller();
