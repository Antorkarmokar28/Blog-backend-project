"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const userLoginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6)
            .max(20),
    }),
});
// Define the userSchema
const userRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3),
        email: zod_1.z.string().trim().email('Invalid email format'),
        password: zod_1.z.string().nonempty('Password is required').min(6),
        role: zod_1.z.enum(['admin', 'user']).default('user').optional(),
        isBlocked: zod_1.z.boolean().default(false).optional(),
    }),
});
const userUpdateRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).optional(),
        email: zod_1.z.string().trim().email('Invalid email format').optional(),
        password: zod_1.z.string().nonempty('Password is required').min(6).optional(),
        role: zod_1.z.enum(['admin', 'user']).default('user').optional(),
        isBlocked: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.AuthValidation = {
    userRegistrationValidationSchema,
    userLoginValidation,
    userUpdateRegistrationValidationSchema,
};
