"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const sellerSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['seller'], required: true },
    password: { type: String, required: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
sellerSchema.statics.isAdminExist = async function (phoneNumber) {
    return await exports.Seller.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1 });
};
sellerSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcrypt_1.default.compare(givenPassword, savedPassword);
};
sellerSchema.pre('save', async function (next) {
    // hashing user password
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_rounds));
    next();
});
exports.Seller = (0, mongoose_1.model)('Seller', sellerSchema);
