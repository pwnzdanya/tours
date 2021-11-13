const ApiError = require('../exceptions/api-error');

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    const { role } = req.user;
    console.log(role);
    console.log(roles);
    if (!roles.includes(role)) {
      return next(ApiError.Forbidden());
    }
    next();
  };

module.exports = restrictTo;
