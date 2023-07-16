"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../midleware/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminZodSchema.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.AdminZodSchema.loginAdminZodSchema), admin_controller_1.AdminController.adminLogin);
exports.AdminRouter = router;
