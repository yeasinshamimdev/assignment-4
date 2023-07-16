import express from 'express';
import validateRequest from '../../midleware/validateRequest';
import { authUserController } from './auth.controller';
import { AuthUserZodValidation } from './authValidation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthUserZodValidation.createAuthUserZodSchema),
  authUserController.createAuthUser
);

router.post(
  '/login',
  validateRequest(AuthUserZodValidation.loginUserZodSchema),
  authUserController.authUserLogin
);

router.post(
  '/refresh-token',
  validateRequest(AuthUserZodValidation.refreshTokenZodSchema),
  authUserController.refreshToken
);

export const AuthRouter = router;
