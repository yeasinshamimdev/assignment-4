import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import { SellerServiceWrapper } from "./seller.service";

const getAllSellers = catchAsync(async (req: Request, res: Response) => {
  const result = await SellerServiceWrapper.getAllSellers();

  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SellerServiceWrapper.getSingleSeller(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'Single user retrive successfull',
    data: result,
  });
});

const updateSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await SellerServiceWrapper.updateSingleSeller(id, data);
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

const deleteSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await SellerServiceWrapper.deleteSeller(id);
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

export const SellerController = {
  getAllSellers,
  getSingleSeller,
  updateSingleSeller,
  deleteSeller
}
