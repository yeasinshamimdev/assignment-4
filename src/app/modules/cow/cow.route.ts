import express from 'express';
import { cowController } from './cow.controller';

const router = express.Router();

router.post('/create-cow', cowController.createCow);
router.patch('/:id', cowController.updateCow);
router.get('/:id', cowController.getSingleCow);
router.delete('/:id', cowController.deleteCow);
router.get('/', cowController.getAllCow);

export const CowRouter = router;
