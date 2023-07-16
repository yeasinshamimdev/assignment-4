"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../midleware/auth"));
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
router.post('/create-cow', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.cowController.createCow);
router.patch('/:id', cow_controller_1.cowController.updateCow);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.BUYER), cow_controller_1.cowController.getSingleCow);
router.delete('/:id', cow_controller_1.cowController.deleteCow);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.BUYER), cow_controller_1.cowController.getAllCow);
exports.CowRouter = router;
