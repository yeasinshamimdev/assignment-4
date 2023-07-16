"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const buyer_service_1 = require("./buyer.service");
const getAllBuyers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await buyer_service_1.BuyerServiceWrapper.getAllBuyers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});
const getSingleBuyer = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await buyer_service_1.BuyerServiceWrapper.getSingleBuyer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Single user retrive successfull',
        data: result,
    });
});
const updateSingleBuyer = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await buyer_service_1.BuyerServiceWrapper.updateSingleBuyer(id, data);
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
const deleteBuyer = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = await buyer_service_1.BuyerServiceWrapper.deleteBuyer(id);
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
exports.BuyerController = {
    getAllBuyers,
    getSingleBuyer,
    updateSingleBuyer,
    deleteBuyer
};
