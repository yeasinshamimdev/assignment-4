import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../midleware/auth';
import { cowController } from './cow.controller';

const router = express.Router();

router.post('/create-cow', auth(ENUM_USER_ROLE.SELLER), cowController.createCow);

router.patch('/:id', cowController.updateCow);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  cowController.getSingleCow);

router.delete('/:id', cowController.deleteCow);

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  cowController.getAllCow);

export const CowRouter = router;
