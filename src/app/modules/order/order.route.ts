import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../midleware/auth';
import { createOrder, getAllOrders } from './order.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.BUYER), createOrder);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), getAllOrders);

export const OrderRouter = router;
