"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceWrapper = void 0;
const user_model_1 = require("./user.model");
const getAllUsers = async () => {
    const result = await user_model_1.User.find({});
    return result;
};
const getSingleUser = async (id) => {
    const result = await user_model_1.User.findById(id);
    return result;
};
const updateSingleUser = async (id, payload) => {
    const result = await user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteUser = async (id) => {
    const result = await user_model_1.User.findByIdAndDelete(id);
    return result;
};
exports.UserServiceWrapper = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
};
