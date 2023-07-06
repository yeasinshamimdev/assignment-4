import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationField } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { cowFilterableFields } from './cow.constant';
import { ICow } from './cow.interface';
import { CowServiceWrapper } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowServiceWrapper.createCow(cowData);

  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});

const getAllCow = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationField);

  const result = await CowServiceWrapper.getAllCow(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowServiceWrapper.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Single Cow Retrive successfully',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await CowServiceWrapper.updateCow(id, data);

  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow Update successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedCow = await CowServiceWrapper.deleteCow(id);
  if (!deletedCow) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Cow not found',
      data: null,
    });
  }

  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow delete successfully',
  });
});

export const cowController = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
