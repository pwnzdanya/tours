const AuthService = require('../auth/auth.service');
const UserService = require('../user/user.service');
const ApiError = require('../exceptions/api-error');

const auth = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return next(ApiError.Unauthorized());
    }
    const decoded = AuthService.validateToken(req.cookies.jwt);
    console.log(decoded.id);
    const user = await UserService.getOne(decoded.id);

    if (!user) {
      return next(ApiError.Unauthorized());
    }
    req.user = user;
    return next();
  } catch (e) {
    next(ApiError.Unauthorized());
  }
};

module.exports = auth;
