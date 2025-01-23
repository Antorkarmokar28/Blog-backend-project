"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const zodErrorHandaler_1 = __importDefault(require("../errors/zodErrorHandaler"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const appError_1 = __importDefault(require("../errors/appError"));
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandeling = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = 'Something went worng!';
    let errorSources = [
        {
            path: '',
            message: 'Something went worng!',
        },
    ];
    // checking zod, mongose, cast error
    if (err instanceof zod_1.ZodError) {
        const simplefiedError = (0, zodErrorHandaler_1.default)(err);
        statusCode = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.statusCode;
        message = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.message;
        errorSources = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.errorSources;
    }
    else if (err.name === 'ValidationError') {
        const simplefiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.statusCode;
        message = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.message;
        errorSources = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.errorSources;
    }
    else if (err.name === 'CastError') {
        const simplefiedError = (0, handleCastError_1.default)(err);
        statusCode = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.statusCode;
        message = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.message;
        errorSources = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.errorSources;
    }
    else if (err.code === 11000) {
        const simplefiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.statusCode;
        message = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.message;
        errorSources = simplefiedError === null || simplefiedError === void 0 ? void 0 : simplefiedError.errorSources;
    }
    else if (err instanceof appError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // err,
        stack: config_1.default.dev_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandeling;
