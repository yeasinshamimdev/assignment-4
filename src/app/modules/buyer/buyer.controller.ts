import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import { BuyerServiceWrapper } from "./buyer.service";

const getAllBuyers = catchAsync(async (req: Request, res: Response) => {
  const result = await BuyerServiceWrapper.getAllBuyers();

  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingleBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BuyerServiceWrapper.getSingleBuyer(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'Single user retrive successfull',
    data: result,
  });
});

const updateSingleBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await BuyerServiceWrapper.updateSingleBuyer(id, data);
  if (!result) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'User not found',
      data: null,
    });
  }

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'Update single user successfull',
    data: result,
  });
});

const deleteBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await BuyerServiceWrapper.deleteBuyer(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'User not found',
      data: null,
    });
  }
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'Delete user successfull',
  });
});

export const BuyerController = {
  getAllBuyers,
  getSingleBuyer,
  updateSingleBuyer,
  deleteBuyer
}
