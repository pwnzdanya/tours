const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../user/user.model');
const ApiError = require('../exceptions/api-error');

class AuthService {
  getToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  validateToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }

  createCookieOptions() {
    return {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_INSPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    };
  }

  async signIn(email, password) {
    if (!email || !password) {
      throw ApiError.BadRequest(`please enter all data`);
    }

    const { dataValues } = await User.findOne({ where: { email } });

    if (!dataValues) {
      throw ApiError.BadRequest(`email or password is not correct`);
    }

    const isCorrectPass = await bcrypt.compare(password, dataValues.password);
    if (!isCorrectPass) {
      throw ApiError.BadRequest(`email or password is not correct`);
    }

    delete dataValues.password;
    const token = this.getToken(dataValues.id);
    return {
      ...dataValues,
      token,
    };
  }

  async forgotPassword(email) {
    if (!email) {
      throw ApiError.BadRequest(`email does not exist`);
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.NotFound(`user with this email not found`);
    }
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await User.update({ passwordResetToken }, { where: { email } });
    await User.update({ passwordResetExpires }, { where: { email } });
    return resetToken;
  }
}

module.exports = new AuthService();
