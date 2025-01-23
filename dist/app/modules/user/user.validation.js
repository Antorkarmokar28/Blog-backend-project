"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// Define the userFullNameSchema
const createUserFullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().min(1, { message: 'First name is required' }),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z.string().trim().min(1, { message: 'Last name is required' }),
});
// Define the userSchema
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: createUserFullNameValidationSchema,
        email: zod_1.z.string().trim().email('Invalid email format'),
        password: zod_1.z.string().nonempty('Password is required'),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        isBlocked: zod_1.z.boolean().default(false).optional(),
    }),
});
// Define the update userFullNameSchema
const updateUserFullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().optional(),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z.string().trim().optional(),
});
// Define the update userSchema
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: updateUserFullNameValidationSchema.optional(),
        email: zod_1.z.string().trim().email('Invalid email format').optional(),
        password: zod_1.z.string().nonempty('Password is required').optional(),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        isBlocked: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
