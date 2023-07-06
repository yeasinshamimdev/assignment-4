'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const handleValidationError = error => {
  const errors = Object.values(error.errors).map(err => {
    return {
      path: err?.path,
      message: err?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
exports.default = handleValidationError;
