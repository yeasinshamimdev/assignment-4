import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IUserLogin = {
  phoneNumber: string;
  password: string;
}

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};