"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRouter = void 0;
const express_1 = __importDefault(require("express"));
const seller_controller_1 = require("./seller.controller");
const router = express_1.default.Router();
router.get('/:id', seller_controller_1.SellerController.getSingleSeller);
router.patch('/:id', seller_controller_1.SellerController.updateSingleSeller);
router.delete('/:id', seller_controller_1.SellerController.deleteSeller);
router.get('/', seller_controller_1.SellerController.getAllSellers);
exports.SellerRouter = router;
