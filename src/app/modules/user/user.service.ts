import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  console.log(payload);
  const result = await User.create(payload);
  return result;
};

export const UserServiceWrapper = {
  createUser,
};
