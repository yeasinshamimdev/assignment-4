'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.cowController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const cow_constant_1 = require('./cow.constant');
const cow_service_1 = require('./cow.service');
const createCow = (0, catchAsync_1.default)(async (req, res) => {
  const { ...cowData } = req.body;
  const result = await cow_service_1.CowServiceWrapper.createCow(cowData);
  (0, sendResponse_1.default)(res, {
    statusCode: 200,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});
const getAllCow = (0, catchAsync_1.default)(async (req, res) => {
  const filters = (0, pick_1.default)(
    req.query,
    cow_constant_1.cowFilterableFields
  );
  const paginationOptions = (0, pick_1.default)(
    req.query,
    pagination_1.paginationField
  );
  const result = await cow_service_1.CowServiceWrapper.getAllCow(
    filters,
    paginationOptions
  );
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleCow = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const result = await cow_service_1.CowServiceWrapper.getSingleCow(id);
  (0, sendResponse_1.default)(res, {
    statusCode: 200,
    success: true,
    message: 'Single Cow Retrive successfully',
    data: result,
  });
});
const updateCow = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await cow_service_1.CowServiceWrapper.updateCow(id, data);
  (0, sendResponse_1.default)(res, {
    statusCode: 200,
    success: true,
    message: 'Cow Update successfully',
    data: result,
  });
});
const deleteCow = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const deletedCow = await cow_service_1.CowServiceWrapper.deleteCow(id);
  if (!deletedCow) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Cow not found',
      data: null,
    });
  }
  (0, sendResponse_1.default)(res, {
    statusCode: 200,
    success: true,
    message: 'Cow delete successfully',
  });
});
exports.cowController = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
