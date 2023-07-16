"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const seller_service_1 = require("./seller.service");
const getAllSellers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await seller_service_1.SellerServiceWrapper.getAllSellers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});
const getSingleSeller = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await seller_service_1.SellerServiceWrapper.getSingleSeller(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Single user retrive successfull',
        data: result,
    });
});
const updateSingleSeller = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await seller_service_1.SellerServiceWrapper.updateSingleSeller(id, data);
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
const deleteSeller = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = await seller_service_1.SellerServiceWrapper.deleteSeller(id);
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
exports.SellerController = {
    getAllSellers,
    getSingleSeller,
    updateSingleSeller,
    deleteSeller
};
