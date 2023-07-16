"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerServiceWrapper = void 0;
const seller_model_1 = require("./seller.model");
const getAllSellers = async () => {
    const result = await seller_model_1.Seller.find({});
    return result;
};
const getSingleSeller = async (id) => {
    const result = await seller_model_1.Seller.findById(id);
    return result;
};
const updateSingleSeller = async (id, payload) => {
    const result = await seller_model_1.Seller.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteSeller = async (id) => {
    const result = await seller_model_1.Seller.findByIdAndDelete(id);
    return result;
};
exports.SellerServiceWrapper = {
    getAllSellers,
    getSingleSeller,
    updateSingleSeller,
    deleteSeller
};
