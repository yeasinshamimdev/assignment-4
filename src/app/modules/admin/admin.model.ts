import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import CustomApiError from '../../../error/CustomError';
import { IAdmin, IAdminModel } from './admin.interface';

const adminSchema = new Schema<IAdmin, IAdminModel>({
  phoneNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin'], required: true },
  password: { type: String, required: true, select: 0 },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  address: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});


adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<IAdmin | null> {
  return await Admin.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1 }
  );
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


adminSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});

adminSchema.pre('save', async function (next) {
  const isExist = await Admin.findOne({
    phoneNumber: this.phoneNumber,
  });
  // find the duplicate phone number
  if (isExist) {
    throw new CustomApiError(
      httpStatus.CONFLICT,
      `duplicate key error, phone number ${this?.phoneNumber} is already exist`
    );
  }
  next();
});

const Admin = model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin;
