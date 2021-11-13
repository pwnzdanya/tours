const bcrypt = require('bcrypt');
const User = require('./user.model');
const AuthService = require('../auth/auth.service');
const ApiError = require('../exceptions/api-error');

class UserService {
  buildUserResponse(user) {
    return {
      name: user.name,
      photo: user.photo,
      email: user.email,
    };
  }

  async create(user) {
    if (!user) {
      throw ApiError('invalid user data');
    }
    const hashPassword = await bcrypt.hash(user.password, 6);
    const newUser = {
      name: user.name,
      password: hashPassword,
      email: user.email,
      photo: user.photo || null,
      role: user.role || 'user',
    };
    const createdUser = await User.create(newUser);
    const token = AuthService.getToken(createdUser.id);

    return {
      ...newUser,
      token,
    };
  }

  async getOne(id) {
    if (!id || id.length !== 36) {
      throw ApiError(`user does not exist`);
    }
    const user = await User.findOne({ where: { id } });
    delete user.password;
    return user;
  }

  async updatePassword(currentPassword, newPassword, userId) {
    if (!currentPassword || !newPassword) {
      throw ApiError.BadRequest(`please enter correct data`);
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw ApiError.BadRequest(`user not found`);
    }

    const isCorrectPass = await bcrypt.compare(currentPassword, user.password);
    if (!isCorrectPass) {
      throw ApiError.BadRequest(`password is not correct`);
    }

    user.password = await bcrypt.hash(newPassword, 6);
    await user.save();
  }

  async delete(password, userId) {
    if (!password) {
      throw ApiError.BadRequest(`please enter correct data`);
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw ApiError.BadRequest(`user not found`);
    }

    const isCorrectPass = await bcrypt.compare(password, user.password);
    if (!isCorrectPass) {
      throw ApiError.BadRequest(`password is not correct`);
    }

    await User.destroy({
      where: {
        id: userId,
      },
    });
  }
}

module.exports = new UserService();
