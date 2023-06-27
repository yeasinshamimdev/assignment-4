import httpStatus from 'http-status';
import CustomApiError from '../../../error/CustomError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createAuthUser = async (payload: IUser): Promise<IUser> => {
  if (payload?.role === 'buyer' && payload?.budget <= 0) {
    throw new CustomApiError(
      httpStatus.BAD_REQUEST,
      'Buyer budget can not be less than 0'
    );
  }
  const result = await User.create(payload);
  return result;
};

export const AuthServiceWrapper = {
  createAuthUser,
};
