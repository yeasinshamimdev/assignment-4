"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const CustomError_1 = __importDefault(require("../../../error/CustomError"));
const adminSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin'], required: true },
    password: { type: String, required: true, select: 0 },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
adminSchema.statics.isAdminExist = async function (phoneNumber) {
    return await Admin.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1 });
};
adminSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcrypt_1.default.compare(givenPassword, savedPassword);
};
adminSchema.pre('save', async function (next) {
    // hashing user password
    this.password = await bcrypt_1.default.hash(this.password, Number(config_1.default.bycrypt_salt_rounds));
    next();
});
adminSchema.pre('save', async function (next) {
    const isExist = await Admin.findOne({
        phoneNumber: this.phoneNumber,
    });
    // find the duplicate phone number
    if (isExist) {
        throw new CustomError_1.default(http_status_1.default.CONFLICT, `duplicate key error, phone number ${this?.phoneNumber} is already exist`);
    }
    next();
});
const Admin = (0, mongoose_1.model)('Admin', adminSchema);
exports.default = Admin;
