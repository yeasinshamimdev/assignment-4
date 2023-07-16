"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerServiceWrapper = void 0;
const buyer_model_1 = require("./buyer.model");
const getAllBuyers = async () => {
    const result = await buyer_model_1.Buyer.find({});
    return result;
};
const getSingleBuyer = async (id) => {
    const result = await buyer_model_1.Buyer.findById(id);
    return result;
};
const updateSingleBuyer = async (id, payload) => {
    const result = await buyer_model_1.Buyer.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteBuyer = async (id) => {
    const result = await buyer_model_1.Buyer.findByIdAndDelete(id);
    return result;
};
exports.BuyerServiceWrapper = {
    getAllBuyers,
    getSingleBuyer,
    updateSingleBuyer,
    deleteBuyer
};
