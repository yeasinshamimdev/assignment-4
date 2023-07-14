/* eslint-disable no-unused-vars */
import { Model, Schema } from "mongoose";

export type IAdmin = {
  _id: Schema.Types.ObjectId;
  phoneNumber: string;
  role: 'admin';
  password?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
}

export type IAdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, '_id' | 'phoneNumber' | 'password' | 'role'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

