"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceWrapper = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const CustomError_1 = __importDefault(require("../../../error/CustomError"));
const jwtHelper_1 = require("../../../helper/jwtHelper");
const buyer_model_1 = require("../buyer/buyer.model");
const seller_model_1 = require("../seller/seller.model");
const user_model_1 = require("../user/user.model");
const createAuthUser = async (payload) => {
    let newUserAllData = null;
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        let newUserData = null;
        if (payload.role === 'seller') {
            newUserData = await seller_model_1.Seller.create([payload], { session });
            if (!newUserData.length) {
                throw new CustomError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create seller');
            }
            payload.seller = newUserData[0]._id;
        }
        if (payload.role === 'buyer') {
            newUserData = await buyer_model_1.Buyer.create([payload], { session });
            if (!newUserData.length) {
                throw new CustomError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create seller');
            }
            payload.buyer = newUserData[0]._id;
        }
        const newUser = await user_model_1.User.create([payload], { session });
        if (!newUser.length) {
            throw new CustomError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        newUserAllData = newUser[0];
        await session.commitTransaction();
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
    // eslint-disable-next-line no-unused-vars
    const { password, seller, buyer, ...userDataWithoutPassword } = newUserAllData.toObject();
    return userDataWithoutPassword;
};
const authUserLogin = async (payload) => {
    const { phoneNumber, password } = payload;
    // find admin on dadabase
    const isUserExist = await user_model_1.User.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new CustomError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(await user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
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
const refreshToken = async (token) => {
    //verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.JwtHelper.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new CustomError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = await user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
        throw new CustomError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelper_1.JwtHelper.createJwtToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
};
exports.AuthServiceWrapper = {
    createAuthUser,
    authUserLogin,
    refreshToken
};
