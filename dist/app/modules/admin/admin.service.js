"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServiceWrapper = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const CustomError_1 = __importDefault(require("../../../error/CustomError"));
const jwtHelper_1 = require("../../../helper/jwtHelper");
const admin_model_1 = __importDefault(require("./admin.model"));
const createAdminUser = async (payload) => {
    const result = await admin_model_1.default.create(payload);
    // Exclude the 'password' field from the result object
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...adminDataWithoutPassword } = result.toObject();
    return adminDataWithoutPassword;
};
const adminLogin = async (payload) => {
    const { phoneNumber, password } = payload;
    // find admin on dadabase
    const isUserExist = await admin_model_1.default.isAdminExist(phoneNumber);
    if (!isUserExist) {
        throw new CustomError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(await admin_model_1.default.isPasswordMatched(password, isUserExist.password))) {
        throw new CustomError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { _id, role } = isUserExist;
    const accessToken = jwtHelper_1.JwtHelper.createJwtToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.JwtHelper.createJwtToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken
    };
};
exports.AdminServiceWrapper = {
    createAdminUser,
    adminLogin
};
