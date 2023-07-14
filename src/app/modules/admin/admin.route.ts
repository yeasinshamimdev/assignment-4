import express from 'express';
import validateRequest from '../../midleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminZodSchema } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminZodSchema.createAdminZodSchema),
  AdminController.createAdmin
);
router.post(
  '/login',
  validateRequest(AdminZodSchema.loginAdminZodSchema),
  AdminController.adminLogin
);

export const AdminRouter = router;
