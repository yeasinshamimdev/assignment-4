import express from 'express';
import validateRequest from '../../midleware/validateRequest';
import { userController } from './user.controller';
import { UserZodValidation } from './userValidation';

const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserZodValidation.createUserZodSchema),
  userController.createUser
);

router.get('/users', userController.getAllUsers);

export const UserRouter = router;
