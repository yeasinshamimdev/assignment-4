import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import CustomApiError from '../../../error/CustomError';
import { JwtHelper } from '../../../helper/jwtHelper';
import { ILoginUserResponse, IUserLogin } from '../../../interface/common';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {

  const result = await User.create(payload);
  // eslint-disable-next-line no-unused-vars
  const { password, ...userDataWithoutPassword } = result.toObject();
  return userDataWithoutPassword;
};

const userLogin = async (payload: IUserLogin): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  // find admin on dadabase
  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new CustomApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new CustomApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { _id, role } = isUserExist;

  const accessToken = JwtHelper.createJwtToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelper.createJwtToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken
  };
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateSingleUser = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserServiceWrapper = {
  createUser,
  userLogin,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
