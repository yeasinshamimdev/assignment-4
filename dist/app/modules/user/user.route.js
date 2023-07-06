"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/:id', user_controller_1.userController.getSingleUser);
router.patch('/:id', user_controller_1.userController.updateSingleUser);
router.delete('/:id', user_controller_1.userController.deleteUser);
router.get('/', user_controller_1.userController.getAllUsers);
exports.UserRouter = router;
