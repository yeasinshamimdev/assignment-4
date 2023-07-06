'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthUserZodValidation = void 0;
const zod_1 = require('zod');
const userConstants_1 = require('../user/userConstants');
const createAuthUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    phoneNumber: zod_1.z.string({
      required_error: 'Phone number is required',
    }),
    role: zod_1.z.enum([...userConstants_1.userRole], {
      required_error: 'Role is required',
    }),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
    name: zod_1.z.object({
      firstName: zod_1.z.string({
        required_error: 'First name is required',
      }),
      lastName: zod_1.z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: zod_1.z.string({
      required_error: 'Address is required',
    }),
    budget: zod_1.z.number({
      required_error: 'Budget is required',
    }),
    income: zod_1.z.number({
      required_error: 'Income is required',
    }),
  }),
});
exports.AuthUserZodValidation = {
  createAuthUserZodSchema,
};
