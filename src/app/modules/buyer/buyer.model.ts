import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, IUserModel } from '../user/user.interface';

const buyerSchema = new Schema<IUser, IUserModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['buyer'], required: true },
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
  }
);

buyerSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<IUser | null> {
  return await Buyer.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1 }
  );
};

buyerSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


buyerSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});


export const Buyer = model<IUser, IUserModel>('Buyer', buyerSchema);
