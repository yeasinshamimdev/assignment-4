import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow) => {
  const result = await Cow.create(payload);

  return result;
};

const getAllCow = async () => {
  const result = await Cow.find({});
  return result;
};

const getSingleCow = async (id: string) => {
  const result = await Cow.findById(id);
  return result;
};

const updateCow = async (id: string, data: ICow) => {
  const result = await Cow.findOneAndUpdate({ _id: id }, data, { new: true });
  return result;
};

const deleteCow = async (id: string) => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowServiceWrapper = {
  createCow,
  getSingleCow,
  getAllCow,
  updateCow,
  deleteCow,
};
