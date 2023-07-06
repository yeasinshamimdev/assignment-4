import express from 'express';
import { createOrder, getAllOrders } from './order.controller';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);

export const OrderRouter = router;
