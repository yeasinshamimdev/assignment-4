import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import CustomApiError from '../../../error/CustomError';
import { JwtHelper } from '../../../helper/jwtHelper';
import { IAdmin, IAdminLogin, ILoginAdminResponse } from './admin.interface';
import Admin from './admin.model';

const createAdminUser = async (payload: IAdmin): Promise<IAdmin> => {

  const result = await Admin.create(payload);
  // Exclude the 'password' field from the result object
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...adminDataWithoutPassword } = result.toObject();
  return adminDataWithoutPassword;
};

const adminLogin = async (payload: IAdminLogin): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = payload;

  // find admin on dadabase
  const isUserExist = await Admin.isAdminExist(phoneNumber);

  if (!isUserExist) {
    throw new CustomApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
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

export const AdminServiceWrapper = {
  createAdminUser,
  adminLogin
};
