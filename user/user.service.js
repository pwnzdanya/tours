const bcrypt = require('bcrypt');
const User = require('./user.model');
const AuthService = require('../auth/auth.service');
const ApiError = require('../exceptions/api-error');

class UserService {
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
    delete newUser.password;
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
}

module.exports = new UserService();
