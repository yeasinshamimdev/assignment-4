import { Request, Response } from 'express';
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
    message: 'User created successfull',
    data: result,
  });
});

export const userController = {
  createUser,
};
