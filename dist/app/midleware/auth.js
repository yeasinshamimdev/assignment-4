"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const CustomError_1 = __importDefault(require("../../error/CustomError"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new CustomError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelper_1.JwtHelper.verifyToken(token, config_1.default.jwt.secret);
        req.user = verifiedUser; // role  , userid
        // role diye guard korar jnno
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new CustomError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
