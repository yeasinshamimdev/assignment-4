import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilter } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow) => {
  const result = await Cow.create(payload);

  return result;
};

const getAllCow = async (
  filters: Partial<ICowFilter>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
