import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../midleware/auth';
import { userController } from './user.controller';

const router = express.Router();

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.getSingleUser);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.updateSingleUser);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);

export const UserRouter = router;
