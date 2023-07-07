"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserServiceWrapper.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await user_service_1.UserServiceWrapper.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Single user retrive successfull',
        data: result,
    });
});
const updateSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await user_service_1.UserServiceWrapper.updateSingleUser(id, data);
    if (!result) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'User not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Update single user successfull',
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = await user_service_1.UserServiceWrapper.deleteUser(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'User not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Delete user successfull',
    });
});
exports.userController = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
};
