import express from 'express';
import { SellerController } from './seller.controller';

const router = express.Router();

router.get('/:id', SellerController.getSingleSeller);

router.patch('/:id', SellerController.updateSingleSeller);

router.delete('/:id', SellerController.deleteSeller);

router.get('/', SellerController.getAllSellers);

export const SellerRouter = router;
