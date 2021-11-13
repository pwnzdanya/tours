module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ApiError(401, 'user is not authorized');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static Forbidden() {
    return new ApiError(403, 'You do not have permission to perform this action');
  }

  static NotFound(message, errors = []) {
    return new ApiError(404, message, errors);
  }
};
