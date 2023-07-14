import { Request, Response } from 'express';
import config from '../../../config';
import { ILoginUserResponse } from '../../../interface/common';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserServiceWrapper } from './user.service';


const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserServiceWrapper.createUser(userData);

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserServiceWrapper.userLogin(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  });
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServiceWrapper.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserServiceWrapper.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'Single user retrive successfull',
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await UserServiceWrapper.updateSingleUser(id, data);
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

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await UserServiceWrapper.deleteUser(id);
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

export const userController = {
  createUser,
  userLogin,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
