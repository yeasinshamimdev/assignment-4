import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/:id', userController.getSingleUser);

router.get('/', userController.getAllUsers);

export const UserRouter = router;
