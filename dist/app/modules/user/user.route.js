"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// get single user route
router.get('/:id', user_controller_1.UserController.getSingleUser);
// get all user route
router.get('/', (0, auth_1.default)('admin', 'user'), user_controller_1.UserController.getAllUser);
// update data route
router.patch('/:id', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserValidationSchema), user_controller_1.UserController.updateUser);
exports.UserRoute = router;
