"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../midleware/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const authValidation_1 = require("./authValidation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(authValidation_1.AuthUserZodValidation.createAuthUserZodSchema), auth_controller_1.authUserController.createAuthUser);
exports.AuthRouter = router;
