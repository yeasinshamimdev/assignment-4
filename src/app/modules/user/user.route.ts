import express from 'express';
import validateRequest from '../../midleware/validateRequest';
import { userController } from './user.controller';
import { UserZodSchema } from './user.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(UserZodSchema.loginUserZodSchema),
  userController.userLogin
);

router.post(
  '/signup',
  validateRequest(UserZodSchema.createUserZodSchema),
  userController.createUser
);

router.get('/:id', userController.getSingleUser);

router.patch('/:id', userController.updateSingleUser);

router.delete('/:id', userController.deleteUser);

router.get('/', userController.getAllUsers);

export const UserRouter = router;
