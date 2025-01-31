"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth_model_1 = require("./auth.model");
//user registar into data base
const userRegisterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload === null || payload === void 0 ? void 0 : payload.email;
    const existingUser = yield auth_model_1.User.findOne({ email });
    if (existingUser) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Email already registered');
    }
    const result = yield auth_model_1.User.create(payload);
    return result;
});
//checking if the user is exist
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select('+password');
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    //checking user is blocke or unblocked
    const userIsBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userIsBlocked === true) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'User is blocked');
    }
    //checking user password is matched
    const passwordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatch) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    //generate user token
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    //generate the user access token
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: '30d',
    });
    return { token };
});
exports.UserAuthService = {
    userRegisterIntoDB,
    userLogin,
};
