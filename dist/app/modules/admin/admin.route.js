"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminActionRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("../auth/auth.validation");
const router = (0, express_1.Router)();
router.patch('/users/:userId/block', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.userUpdateRegistrationValidationSchema), admin_controller_1.AdminController.userIsBlockInfoUpdating);
router.delete('/blogs/:id', (0, auth_1.default)('admin'), admin_controller_1.AdminController.userBlogDelete);
exports.AdminActionRouter = router;
