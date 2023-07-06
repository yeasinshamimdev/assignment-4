"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowServiceWrapper = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const createCow = async (payload) => {
    const result = await cow_model_1.Cow.create(payload);
    return result;
};
const getAllCow = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await cow_model_1.Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleCow = async (id) => {
    const result = await cow_model_1.Cow.findById(id);
    return result;
};
const updateCow = async (id, data) => {
    const result = await cow_model_1.Cow.findOneAndUpdate({ _id: id }, data, { new: true });
    return result;
};
const deleteCow = async (id) => {
    const result = await cow_model_1.Cow.findByIdAndDelete(id);
    return result;
};
exports.CowServiceWrapper = {
    createCow,
    getSingleCow,
    getAllCow,
    updateCow,
    deleteCow,
};
