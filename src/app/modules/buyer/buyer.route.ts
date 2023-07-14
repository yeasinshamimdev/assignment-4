import express from 'express';
import { BuyerController } from './buyer.controller';

const router = express.Router();

router.get('/:id', BuyerController.getSingleBuyer);

router.patch('/:id', BuyerController.updateSingleBuyer);

router.delete('/:id', BuyerController.deleteBuyer);

router.get('/', BuyerController.getAllBuyers);

export const BuyerRouter = router;
