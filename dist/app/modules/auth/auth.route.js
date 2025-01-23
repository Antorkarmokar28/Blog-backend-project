"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
// import { UserValidation } from '../user/user.validation';
const auth_controller_1 = require("./auth.controller");
const login_validation_1 = require("./login.validation");
const user_validation_1 = require("../user/user.validation");
const router = (0, express_1.Router)();
// register user router
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), auth_controller_1.UserAuthController.userRegister);
//login user router
router.post('/login', (0, validateRequest_1.default)(login_validation_1.AuthLoginValidation.loginValidation), auth_controller_1.UserAuthController.userLogin);
exports.UserRegistrationRouter = router;
