import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from '../user/user.interface';

const sellerSchema = new Schema<IUser, IUserModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['seller'], required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  { timestamps: true }
);


export const Seller = model<IUser, IUserModel>('Seller', sellerSchema);
