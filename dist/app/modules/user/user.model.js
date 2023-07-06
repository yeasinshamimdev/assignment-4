'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = require('mongoose');
const CustomError_1 = __importDefault(require('../../../error/CustomError'));
const userConstants_1 = require('./userConstants');
const userSchema = new mongoose_1.Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: userConstants_1.userRole, required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  const isExist = await exports.User.findOne({
    phoneNumber: this.phoneNumber,
  });
  if (isExist) {
    throw new CustomError_1.default(
      http_status_1.default.CONFLICT,
      `duplicate key error, phone number ${this?.phoneNumber} is already exist`
    );
  }
  next();
});
exports.User = (0, mongoose_1.model)('User', userSchema);
