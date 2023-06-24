import httpStatus from 'http-status';
import CustomApiError from '../../../error/CustomError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  if (payload?.role === 'buyer' && payload?.budget <= 0) {
    throw new CustomApiError(
      httpStatus.BAD_REQUEST,
      'Buyer budget can not be less than 0'
    );
  }
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

export const UserServiceWrapper = {
  createUser,
  getAllUsers,
};
