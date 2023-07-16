import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
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
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  },

);

sellerSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<IUser | null> {
  return await Seller.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1 }
  );
};

sellerSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


sellerSchema.pre('save', async function (next) {
  // hashing user password

  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});


export const Seller = model<IUser, IUserModel>('Seller', sellerSchema);
