"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginValidation = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6)
            .max(20),
    }),
});
exports.AuthLoginValidation = {
    loginValidation,
};
