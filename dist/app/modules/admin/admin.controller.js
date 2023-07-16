"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const admin_service_1 = require("./admin.service");
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { ...adminData } = req.body;
    const result = await admin_service_1.AdminServiceWrapper.createAdminUser(adminData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin created successfully',
        data: result,
    });
});
const adminLogin = (0, catchAsync_1.default)(async (req, res) => {
    const { ...loginData } = req.body;
    const result = await admin_service_1.AdminServiceWrapper.adminLogin(loginData);
    const { refreshToken, ...others } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin logged in successfully !',
        data: others,
    });
});
exports.AdminController = {
    createAdmin,
    adminLogin
};
