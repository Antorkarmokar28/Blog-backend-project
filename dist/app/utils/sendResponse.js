"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//send response with custom function defination
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        message: data === null || data === void 0 ? void 0 : data.message,
        token: data.token,
        data: data.data,
    });
};
exports.default = sendResponse;
