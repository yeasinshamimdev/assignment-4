'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthServiceWrapper = void 0;
const http_status_1 = __importDefault(require('http-status'));
const CustomError_1 = __importDefault(require('../../../error/CustomError'));
const user_model_1 = require('../user/user.model');
const createAuthUser = async payload => {
  if (payload?.role === 'buyer' && payload?.budget <= 0) {
    throw new CustomError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Buyer budget can not be less than 0'
    );
  }
  const result = await user_model_1.User.create(payload);
  return result;
};
exports.AuthServiceWrapper = {
  createAuthUser,
};
