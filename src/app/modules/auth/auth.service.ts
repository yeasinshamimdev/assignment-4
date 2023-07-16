import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import CustomApiError from '../../../error/CustomError';
import { JwtHelper } from '../../../helper/jwtHelper';
import { ILoginUserResponse, IUserLogin } from '../../../interface/common';
import { Buyer } from '../buyer/buyer.model';
import { Seller } from '../seller/seller.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IRefreshTokenResponse } from './auth.interface';

const createAuthUser = async (payload: IUser): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let newUserData = null;
    if (payload.role === 'seller') {
      newUserData = await Seller.create([payload], { session });
      if (!newUserData.length) {
        throw new CustomApiError(httpStatus.BAD_REQUEST, 'Failed to create seller');
      }
      payload.seller = newUserData[0]._id
    }

    if (payload.role === 'buyer') {
      newUserData = await Buyer.create([payload], { session });
      if (!newUserData.length) {
        throw new CustomApiError(httpStatus.BAD_REQUEST, 'Failed to create seller');
      }
      payload.buyer = newUserData[0]._id
    }

    const newUser = await User.create([payload], { session });

    if (!newUser.length) {
      throw new CustomApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  // eslint-disable-next-line no-unused-vars
  const { password, seller, buyer, ...userDataWithoutPassword } = newUserAllData.toObject();
  return userDataWithoutPassword;
};

const authUserLogin = async (payload: IUserLogin): Promise<ILoginUserResponse> => {
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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new CustomApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new CustomApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = JwtHelper.createJwtToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServiceWrapper = {
  createAuthUser,
  authUserLogin,
  refreshToken
};
