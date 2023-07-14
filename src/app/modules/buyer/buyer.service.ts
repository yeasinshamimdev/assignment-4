import { IUser } from "../user/user.interface";
import { Buyer } from "./buyer.model";

const getAllBuyers = async (): Promise<IUser[]> => {
  const result = await Buyer.find({});
  return result;
};

const getSingleBuyer = async (id: string): Promise<IUser | null> => {
  const result = await Buyer.findById(id);
  return result;
};

const updateSingleBuyer = async (id: string, payload: Partial<IUser>) => {
  const result = await Buyer.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBuyer = async (id: string) => {
  const result = await Buyer.findByIdAndDelete(id);
  return result;
};

export const BuyerServiceWrapper = {
  getAllBuyers,
  getSingleBuyer,
  updateSingleBuyer,
  deleteBuyer
}