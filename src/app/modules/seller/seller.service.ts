import { IUser } from "../user/user.interface";
import { Seller } from "./seller.model";

const getAllSellers = async (): Promise<IUser[]> => {
  const result = await Seller.find({});
  return result;
};

const getSingleSeller = async (id: string): Promise<IUser | null> => {
  const result = await Seller.findById(id);
  return result;
};

const updateSingleSeller = async (id: string, payload: Partial<IUser>) => {
  const result = await Seller.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSeller = async (id: string) => {
  const result = await Seller.findByIdAndDelete(id);
  return result;
};

export const SellerServiceWrapper = {
  getAllSellers,
  getSingleSeller,
  updateSingleSeller,
  deleteSeller
}